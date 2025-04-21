import {ConvexError, v} from "convex/values";
import {MutationCtx, QueryCtx, internalMutation, mutation, query} from "./_generated/server";
import {activity, link} from "./schema";

export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
	const user = await ctx.db
		.query("users")
		.withIndex("by_userId", q => q.eq("userId", tokenIdentifier))
		.first();

	if (!user) {
		throw new ConvexError("User not found");
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

	// Delete the userInLesson
	const userInLesson = await ctx.db
		.query("userLessons")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (userInLesson) {
		await Promise.all(
			userInLesson.map(async lesson => {
				await ctx.db.delete(lesson._id);
			}),
		);
	}

	// Delete the userInProblem
	const userInProblem = await ctx.db
		.query("userProblems")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (userInProblem) {
		await Promise.all(
			userInProblem.map(async problem => {
				await ctx.db.delete(problem._id);
			}),
		);
	}

	// Delete the user'comments
	const userComments = await ctx.db
		.query("comments")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.collect();
	if (userComments) {
		await Promise.all(
			userComments.map(async comment => {
				if (comment.CCommentId && comment.CCommentId.length > 0) {
					await Promise.all(
						comment.CCommentId.map(async commentId => {
							await ctx.db.delete(commentId);
						}),
					);
				}
				await ctx.db.delete(comment._id);
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
		deleteUserById(ctx, args.userId);
	},
});

//************************************** */

export const getUserProfile = query({
	args: {userId: v.string()},
	async handler(ctx, args) {
		return await getUser(ctx, args.userId);
	},
});

export const updateUserProfile = mutation({
	args: {
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		links: v.optional(link),
		introduce: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.patch(user._id, {
			name: args.name,
			image: args.image,
			links: args.links,
			introduce: args.introduce,
		});
		return await getUser(ctx, identity.subject);
	},
});

export const addActivityForUser = mutation({
	args: {
		activity: activity,
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.patch(await user._id, {
			activities: [...(user.activities || []), args.activity],
		});
	},
});

export const changeActivityOfUser = mutation({
	args: {
		activity: activity,
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.patch(await user._id, {
			activities: user.activities?.map(activity => {
				if (activity.day === args.activity.day) {
					return args.activity;
				}
				return activity;
			}),
		});
	},
});

export const getMe = query({
	args: {},
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		return await getUser(ctx, identity.subject);
	},
});
