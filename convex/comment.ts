import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";

export async function getComment(ctx: MutationCtx | QueryCtx, commentId: Id<"comments">) {
	const comment = await ctx.db.get(commentId);
	if (!comment) {
		throw new ConvexError("Comment not found");
	}
	return comment;
}

export const getChildrenComments = query({
	args: {commentId: v.id("comments")},
	async handler(ctx, args) {
		const comments = await ctx.db.get(args.commentId);
		if (!comments?.CCommentId || comments?.CCommentId.length === 0) {
			return [];
		}
		return await Promise.all(
			comments.CCommentId.map(async commentId => {
				const comment = await ctx.db.get(commentId);
				if (comment) {
					return comment;
				}
			}),
		);
	},
});

export const updateComment = mutation({
	args: {
		commentId: v.id("comments"),
		content: v.optional(v.string()),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.commentId, {
			...args,
		});
	},
});

export async function removeCComment(ctx: MutationCtx, commentId: Id<"comments">) {
	const comment = await getComment(ctx, commentId);
	if (comment.CCommentId && comment.CCommentId.length > 0) {
		await Promise.all(
			comment.CCommentId.map(async childCommentId => {
				await removeCComment(ctx, childCommentId);
			}),
		);
	}
	ctx.db.delete(commentId);
}

export const deleteComment = mutation({
	args: {
		commentId: v.id("comments"),
		placeId: v.optional(v.string()),
		placeType: v.optional(v.union(v.literal("course"), v.literal("lesson"), v.literal("problem"))),
		PCommentId: v.optional(v.id("comments")),
	},
	async handler(ctx, args) {
		if (args.PCommentId) {
			const PComment = await ctx.db.get(args.PCommentId);
			if (PComment?.CCommentId && PComment.CCommentId.length > 0) {
				{
					await ctx.db.patch(args.PCommentId, {
						CCommentId: PComment.CCommentId.filter(commentId => commentId !== args.commentId),
					});
				}
			} else if (args.placeId && args.placeType) {
				{
					if (args.placeType === "course") {
						await ctx.db.delete(args.placeId as Id<"courses">);
					} else if (args.placeType === "lesson") {
						await ctx.db.delete(args.placeId as Id<"lessons">);
					} else if (args.placeType === "problem") {
						await ctx.db.delete(args.placeId as Id<"problems">);
					}
				}
			}
		}
		const userCourses = await ctx.db
			.query("userCourses")
			.filter(q => q.eq(q.field("courseId"), args.placeId))
			.collect();
		if (userCourses && userCourses.length > 0) {
			await Promise.all(
				userCourses.map(async userCourse => {
					await ctx.db.delete(userCourse._id);
				}),
			);
		}
		await removeCComment(ctx, args.commentId);
	},
});

export const getComments = query({
	args: {
		placeId: v.string(),
		placeType: v.union(v.literal("course"), v.literal("lesson"), v.literal("problem")),
	},
	async handler(ctx, args) {
		if (args.placeType === "course") {
			const comments = await ctx.db
				.query("courseComments")
				.filter(q => q.eq(q.field("courseId"), args.placeId as Id<"courses">))
				.collect();
			return await Promise.all(
				comments.map(async comment => {
					const commentData = await ctx.db.get(comment.commentId);
					if (commentData) {
						return commentData;
					}
				}),
			);
		} else if (args.placeType === "lesson") {
			const comments = await ctx.db
				.query("lessonComments")
				.filter(q => q.eq(q.field("lessonId"), args.placeId as Id<"lessons">))
				.collect();
			return await Promise.all(
				comments.map(async comment => {
					const commentData = await ctx.db.get(comment.commentId);
					if (commentData) {
						return commentData;
					}
				}),
			);
		} else if (args.placeType === "problem") {
			const comments = await ctx.db
				.query("problemComments")
				.filter(q => q.eq(q.field("problemId"), args.placeId as Id<"problems">))
				.collect();
			return await Promise.all(
				comments.map(async comment => {
					const commentData = await ctx.db.get(comment.commentId);
					if (commentData) {
						return commentData;
					}
				}),
			);
		}
		return [];
	},
});

export const createComment = mutation({
	args: {
		placeId: v.optional(v.string()),
		placeType: v.optional(v.union(v.literal("course"), v.literal("lesson"), v.literal("problem"))),
		PCommentId: v.optional(v.id("comments")),

		content: v.string(),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		userId: v.string(),
	},
	async handler(ctx, args) {
		const commentId = await ctx.db.insert("comments", {
			content: args.content,
			likes: args.likes || 0,
			dislikes: args.dislikes || 0,
			userId: args.userId,
		});

		if (args.PCommentId) {
			const PComment = await ctx.db.get(args.PCommentId);
			await ctx.db.patch(args.PCommentId, {
				CCommentId: [...(PComment?.CCommentId || []), commentId],
			});
		} else if (args.placeId && args.placeType) {
			if (args.placeType === "course") {
				await ctx.db.insert("courseComments", {
					courseId: args.placeId as Id<"courses">,
					commentId,
				});
			} else if (args.placeType === "lesson") {
				await ctx.db.insert("lessonComments", {
					lessonId: args.placeId as Id<"lessons">,
					commentId,
				});
			} else if (args.placeType === "problem") {
				await ctx.db.insert("problemComments", {
					problemId: args.placeId as Id<"problems">,
					commentId,
				});
			}
		}

		return commentId;
	},
});
