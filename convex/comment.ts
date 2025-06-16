import {paginationOptsValidator} from "convex/server";
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

export async function removeComment(ctx: MutationCtx, commentId: Id<"comments">) {
	const comment = await getComment(ctx, commentId);
	if (!comment) {
		return;
	}
	// Recursively delete all replies to this comment
	const replies = await ctx.db
		.query("comments")
		.withIndex("by_parent", q => q.eq("parent", comment._id))
		.collect();
	if (replies.length > 0) {
		await Promise.all(
			replies.map(async reply => {
				await removeComment(ctx, reply._id); // Recursive call
			}),
		);
	}
	// Delete the comment itself
	await ctx.db.delete(comment._id);
}

export const createComment = mutation({
	args: {
		content: v.string(),
		userId: v.string(),
		placeId: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("comments", {
			content: args.content,
			userId: args.userId,
			placeId: args.placeId,
			reply: false, // Default to false for new comments
		});
	},
});

export const updateComment = mutation({
	args: {
		commentId: v.id("comments"),
		content: v.optional(v.string()),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		parent: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const {commentId, ...fields} = args;
		const updateFields = Object.fromEntries(
			Object.entries(fields).filter(([_, v]) => v !== undefined),
		);
		if (Object.keys(updateFields).length === 0) return; // No fields to update
		await ctx.db.patch(commentId, updateFields);
	},
});

export const replyToComment = mutation({
	args: {
		content: v.string(),
		userId: v.string(),
		parent: v.id("comments"),
		placeId: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("comments", {
			content: args.content,
			userId: args.userId,
			parent: args.parent,
			placeId: args.placeId,
			reply: false,
		});
		await ctx.db.patch(args.parent, {
			reply: true, // Mark the parent comment as having a reply
		});
	},
});

export const getCommentsByPlace = query({
	args: {
		placeId: v.id("places"),
		paginationOpts: paginationOptsValidator,
	},

	async handler(ctx, args) {
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_placeId", q => q.eq("placeId", args.placeId))
			.order("desc")
			.paginate(args.paginationOpts);

		if (parent.length === 0) {
			return [];
		}
		return comments;
	},
});

export const getCommentsByParent = query({
	args: {
		parent: v.id("comments"),
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, args) {
		return await ctx.db
			.query("comments")
			.withIndex("by_parent", q => q.eq("parent", args.parent))
			.order("desc")
			.paginate(args.paginationOpts);
	},
});

export const deleteComment = mutation({
	args: {commentId: v.id("comments")},
	async handler(ctx, args) {
		await removeComment(ctx, args.commentId);
	},
});
