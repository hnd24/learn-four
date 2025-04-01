import {v} from "convex/values";
import {mutation, query} from "./_generated/server";

export const createProblemComment = mutation({
	args: {
		problemId: v.id("problems"),
		userId: v.string(),
		content: v.string(),
		commentPId: v.optional(v.id("problemComments")),
	},
	async handler(ctx, args) {
		await ctx.db.insert("problemComments", {
			problemId: args.problemId,
			userId: args.userId,
			content: args.content,
			likes: 0,
			dislikes: 0,
			commentPId: args.commentPId,
		});
	},
});

export const likeProblemComment = mutation({
	args: {commentId: v.id("problemComments")},
	async handler(ctx, args) {
		const comment = await ctx.db.get(args.commentId);
		if (!comment) {
			throw new Error("Comment not found");
		}
		await ctx.db.patch(args.commentId, {likes: (comment.likes || 0) + 1});
	},
});

export const dislikeProblemComment = mutation({
	args: {commentId: v.id("problemComments")},
	async handler(ctx, args) {
		const comment = await ctx.db.get(args.commentId);
		if (!comment) {
			throw new Error("Comment not found");
		}
		await ctx.db.patch(args.commentId, {dislikes: (comment.dislikes || 0) + 1});
	},
});

export const changeProblemComment = mutation({
	args: {
		commentId: v.id("problemComments"),
		content: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.commentId, {content: args.content});
	},
});

export const deleteProblemComment = mutation({
	args: {commentId: v.id("problemComments")},
	async handler(ctx, args) {
		// delete the comment
		await ctx.db.delete(args.commentId);
		// delete all comments that are children of the comment
		const commentC = await ctx.db
			.query("problemComments")
			.withIndex("by_commentPId", q => q.eq("commentPId", args.commentId))
			.collect();
		if (commentC) {
			await Promise.all(
				commentC.map(async comment => {
					await ctx.db.delete(comment._id);
				}),
			);
		}
	},
});

export const getProblemComments = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		return await ctx.db
			.query("problemComments")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.collect();
	},
});

// ***********************************************

export const getCourseComments = query({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		return await ctx.db
			.query("courseComments")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.collect();
	},
});

export const createCourseComment = mutation({
	args: {
		courseId: v.id("courses"),
		userId: v.string(),
		content: v.string(),
		commentPId: v.optional(v.id("courseComments")),
	},
	async handler(ctx, args) {
		await ctx.db.insert("courseComments", {
			courseId: args.courseId,
			userId: args.userId,
			content: args.content,
			likes: 0,
			dislikes: 0,
			commentPId: args.commentPId,
		});
	},
});

export const likeCourseComment = mutation({
	args: {commentId: v.id("courseComments")},
	async handler(ctx, args) {
		const comment = await ctx.db.get(args.commentId);
		if (!comment) {
			throw new Error("Comment not found");
		}
		await ctx.db.patch(args.commentId, {likes: (comment.likes || 0) + 1});
	},
});

export const dislikeCourseComment = mutation({
	args: {commentId: v.id("courseComments")},
	async handler(ctx, args) {
		const comment = await ctx.db.get(args.commentId);
		if (!comment) {
			throw new Error("Comment not found");
		}
		await ctx.db.patch(args.commentId, {dislikes: (comment.dislikes || 0) + 1});
	},
});

export const changeCourseComment = mutation({
	args: {
		commentId: v.id("courseComments"),
		content: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.commentId, {content: args.content});
	},
});

export const deleteCourseComment = mutation({
	args: {commentId: v.id("courseComments")},
	async handler(ctx, args) {
		// delete the comment
		await ctx.db.delete(args.commentId);
		// delete all comments that are children of the comment
		const commentC = await ctx.db
			.query("courseComments")
			.withIndex("by_commentPId", q => q.eq("commentPId", args.commentId))
			.collect();
		if (commentC) {
			await Promise.all(
				commentC.map(async comment => {
					await ctx.db.delete(comment._id);
				}),
			);
		}
	},
});

// ***********************************************

export const getLessonComments = query({
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		return await ctx.db
			.query("lessonComments")
			.withIndex("by_lessonId", q => q.eq("lessonId", args.lessonId))
			.collect();
	},
});

export const createLessonComment = mutation({
	args: {
		lessonId: v.id("lessons"),
		userId: v.string(),
		content: v.string(),
		commentPId: v.optional(v.id("lessonComments")),
	},
	async handler(ctx, args) {
		await ctx.db.insert("lessonComments", {
			lessonId: args.lessonId,
			userId: args.userId,
			content: args.content,
			likes: 0,
			dislikes: 0,
			commentPId: args.commentPId,
		});
	},
});

export const likeLessonComment = mutation({
	args: {commentId: v.id("lessonComments")},
	async handler(ctx, args) {
		const comment = await ctx.db.get(args.commentId);
		if (!comment) {
			throw new Error("Comment not found");
		}
		await ctx.db.patch(args.commentId, {likes: (comment.likes || 0) + 1});
	},
});

export const dislikeLessonComment = mutation({
	args: {commentId: v.id("lessonComments")},
	async handler(ctx, args) {
		const comment = await ctx.db.get(args.commentId);
		if (!comment) {
			throw new Error("Comment not found");
		}
		await ctx.db.patch(args.commentId, {dislikes: (comment.dislikes || 0) + 1});
	},
});

export const changeLessonComment = mutation({
	args: {
		commentId: v.id("lessonComments"),
		content: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.commentId, {content: args.content});
	},
});

export const deleteLessonComment = mutation({
	args: {commentId: v.id("lessonComments")},
	async handler(ctx, args) {
		// delete the comment
		await ctx.db.delete(args.commentId);
		// delete all comments that are children of the comment
		const commentC = await ctx.db
			.query("lessonComments")
			.withIndex("by_commentPId", q => q.eq("commentPId", args.commentId))
			.collect();
		if (commentC) {
			await Promise.all(
				commentC.map(async comment => {
					await ctx.db.delete(comment._id);
				}),
			);
		}
	},
});
