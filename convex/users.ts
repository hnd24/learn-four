import {ConvexError, v} from "convex/values";
import {MutationCtx, QueryCtx, internalMutation, mutation, query} from "./_generated/server";
import {removeComment} from "./comment";
import {LinkType} from "./schema";

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
export async function removeUser(ctx: MutationCtx, userId: string) {
	const user = await getUser(ctx, userId);
	if (!user) {
		return;
	}
	// Delete the user
	//  Delete user_course
	const userCourses = await ctx.db
		.query("user_course")
		.withIndex("by_userId", q => q.eq("userId", user.userId))
		.collect();
	if (userCourses.length > 0) {
		await Promise.all(
			userCourses.map(async userCourse => {
				await ctx.db.delete(userCourse._id);
			}),
		);
	}
	//  Delete user_lesson
	const userLessons = await ctx.db
		.query("user_lesson")
		.withIndex("by_userId", q => q.eq("userId", user.userId))
		.collect();
	if (userLessons.length > 0) {
		await Promise.all(
			userLessons.map(async userLesson => {
				await ctx.db.delete(userLesson._id);
			}),
		);
	}
	//  Delete user_problem
	const userProblems = await ctx.db
		.query("user_problem")
		.withIndex("by_userId", q => q.eq("userId", user.userId))
		.collect();
	if (userProblems.length > 0) {
		await Promise.all(
			userProblems.map(async userProblem => {
				await ctx.db.delete(userProblem._id);
			}),
		);
	}

	// Delete comments made by the user
	const comments = await ctx.db
		.query("comments")
		.withIndex("by_userId", q => q.eq("userId", user.userId))
		.collect();
	if (comments.length > 0) {
		await Promise.all(
			comments.map(async comment => {
				await removeComment(ctx, comment._id);
			}),
		);
	}
	// Finally delete the user
	await ctx.db.delete(user._id);
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
		removeUser(ctx, args.userId);
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
		links: v.optional(LinkType),
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
/************************************************** */
export const userJoinCourse = mutation({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.insert("user_course", {
			userId: user.userId,
			courseId: args.courseId,
			state: "progress",
		});
	},
});

export const userCompleteCourse = mutation({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		const userCourse = await ctx.db
			.query("user_course")
			.withIndex("by_userId_courseId", q =>
				q.eq("userId", user.userId).eq("courseId", args.courseId),
			)
			.first();
		if (!userCourse) {
			throw new ConvexError("User course not found");
		}
		if (userCourse.state === "completed") {
			throw new ConvexError("Course already completed");
		}
		await ctx.db.patch(userCourse._id, {
			state: "completed",
		});
	},
});
/************************************************** */
export const userJoinLesson = mutation({
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.insert("user_lesson", {
			userId: user.userId,
			lessonId: args.lessonId,
			state: "progress",
		});
	},
});

export const userChangeCodeLesson = mutation({
	args: {lessonId: v.id("lessons"), code: v.optional(v.string())},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		const userLesson = await ctx.db
			.query("user_lesson")
			.withIndex("by_userId_lessonId", q =>
				q.eq("userId", user.userId).eq("lessonId", args.lessonId),
			)
			.first();
		if (!userLesson) {
			throw new ConvexError("User lesson not found");
		}
		await ctx.db.patch(userLesson._id, {
			code: args.code,
		});
	},
});

export const userCompleteLesson = mutation({
	args: {lessonId: v.id("lessons"), code: v.optional(v.string())},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		const userLesson = await ctx.db
			.query("user_lesson")
			.withIndex("by_userId_lessonId", q =>
				q.eq("userId", user.userId).eq("lessonId", args.lessonId),
			)
			.first();
		if (!userLesson) {
			throw new ConvexError("User lesson not found");
		}
		await ctx.db.patch(userLesson._id, {
			state: "completed",
			code: args.code,
		});
	},
});
/************************************************** */
export const userJoinProblem = mutation({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.insert("user_problem", {
			userId: user.userId,
			problemId: args.problemId,
			state: "progress",
		});
	},
});
export const userChangeCodeProblem = mutation({
	args: {problemId: v.id("problems"), code: v.optional(v.record(v.string(), v.string()))},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		const userProblem = await ctx.db
			.query("user_problem")
			.withIndex("by_userId_problemId", q =>
				q.eq("userId", user.userId).eq("problemId", args.problemId),
			)
			.first();
		if (!userProblem) {
			throw new ConvexError("User problem not found");
		}
		await ctx.db.patch(userProblem._id, {
			code: args.code,
		});
	},
});

export const userCompleteProblem = mutation({
	args: {problemId: v.id("problems"), code: v.optional(v.record(v.string(), v.string()))},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		const userProblem = await ctx.db
			.query("user_problem")
			.withIndex("by_userId_problemId", q =>
				q.eq("userId", user.userId).eq("problemId", args.problemId),
			)
			.first();
		if (!userProblem) {
			throw new ConvexError("User problem not found");
		}

		await ctx.db.patch(userProblem._id, {
			state: "completed",
			code: args.code,
		});
	},
});
