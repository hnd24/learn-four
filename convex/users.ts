import {ConvexError, v} from "convex/values";
import {MutationCtx, QueryCtx, internalMutation, mutation, query} from "./_generated/server";
import {activity} from "./schema";

export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
	const user = await ctx.db
		.query("users")
		.withIndex("by_userId", q => q.eq("userId", tokenIdentifier))
		.first();

	if (!user) {
		return null;
	}

	return user;
}

export async function deleteUserById(ctx: MutationCtx, userId: string) {
	const user = await getUser(ctx, userId);
	if (!user) {
		return;
	}
	// Delete the user
	await ctx.db.delete(user._id);

	// Delete the role
	const role = await ctx.db
		.query("role")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.first();
	if (role) {
		await ctx.db.delete(role._id);
	}

	// Delete the activity
	const activity = await ctx.db
		.query("activities")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.first();
	if (activity) {
		await ctx.db.delete(activity._id);
	}
	// Delete the userCourse
	const userCourse = await ctx.db
		.query("userCourses")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (userCourse) {
		await Promise.all(
			userCourse.map(async course => {
				await ctx.db.delete(course._id);
			}),
		);
	}
	// Delete the favoriteProblems
	const favoriteProblems = await ctx.db
		.query("favoriteProblems")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();

	if (favoriteProblems) {
		await Promise.all(
			favoriteProblems.map(async problem => {
				await ctx.db.delete(problem._id);
			}),
		);
	}

	// Delete the notifiesToAdmin
	const notifiesToAdmin = await ctx.db
		.query("notifiesToAdmin")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (notifiesToAdmin) {
		await Promise.all(
			notifiesToAdmin.map(async notify => {
				await ctx.db.delete(notify._id);
			}),
		);
	}
	// Delete the notifiesToUser
	const notifiesToUser = await ctx.db
		.query("notifiesToUser")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (notifiesToUser) {
		await Promise.all(
			notifiesToUser.map(async notify => {
				await ctx.db.delete(notify._id);
			}),
		);
	}
	// Delete the codeOfUserInLesson
	const codeOfUserInLesson = await ctx.db
		.query("codeOfUserInLesson")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (codeOfUserInLesson) {
		await Promise.all(
			codeOfUserInLesson.map(async code => {
				await ctx.db.delete(code._id);
			}),
		);
	}
}

export const createUser = internalMutation({
	args: {userId: v.string(), name: v.string(), image: v.string(), email: v.string()},
	async handler(ctx, args) {
		await ctx.db.insert("users", {
			userId: args.userId,
			name: args.name,
			image: args.image,
			email: args.email,
		});
	},
});

export const updateUser = internalMutation({
	args: {userId: v.string(), name: v.string(), image: v.string()},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);
		if (!user) {
			return;
		}
		await ctx.db.patch(user._id, {
			name: args.name,
			image: args.image,
		});
	},
});

export const deleteUser = internalMutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);
		if (!user) {
			return;
		}
		await ctx.db.delete(user._id);
	},
});

//************************************** */

export const getUserProfile = query({
	args: {userId: v.string()},
	async handler(ctx, args) {
		return await getUser(ctx, args.userId);
	},
});

export const updateUserIntroduction = mutation({
	args: {userId: v.string(), introduce: v.string()},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);
		if (!user) {
			throw new ConvexError("User not found");
		}
		await ctx.db.patch(user._id, {introduce: args.introduce});
	},
});

export const getActivities = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		return await ctx.db
			.query("activities")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();
	},
});

export const changeActivity = mutation({
	args: {activity: activity},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const userActivity = await ctx.db
			.query("activities")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();

		const newActivities = (userActivity?.activity || []).map(act => {
			if (act.day === args.activity.day) {
				act.level = args.activity.level;
			}
			return act;
		});

		if (userActivity) {
			await ctx.db.patch(userActivity._id, {activity: newActivities});
		} else {
			await ctx.db.insert("activities", {
				userId: identity.subject,
				activity: [args.activity],
			});
		}
	},
});

export const getMe = query({
	args: {},
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const user = await getUser(ctx, identity.subject);

		if (!user) {
			return null;
		}

		return user;
	},
});
