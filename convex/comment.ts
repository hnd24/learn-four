import {paginationOptsValidator} from 'convex/server';
import {ConvexError, v} from 'convex/values';
import {Id} from './_generated/dataModel';
import {mutation, MutationCtx, query, QueryCtx} from './_generated/server';

export async function getComment(ctx: MutationCtx | QueryCtx, commentId: Id<'comments'>) {
	const comment = await ctx.db.get(commentId);
	if (!comment) {
		throw new ConvexError('Comment not found');
	}
	return comment;
}

export async function removeComment(ctx: MutationCtx, commentId: Id<'comments'>) {
	const comment = await getComment(ctx, commentId);
	if (!comment) {
		return;
	}
	// Recursively delete all replies to this comment
	const replies = await ctx.db
		.query('comments')
		.withIndex('by_placeId', q => q.eq('placeId', comment._id as string))
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
		placeId: v.string(),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('Unauthorized');
		}
		await ctx.db.insert('comments', {
			content: args.content,
			userId: identity.subject,
			placeId: args.placeId,
			reply: false, // Default to false for new comments
		});
	},
});

export const updateComment = mutation({
	args: {
		commentId: v.id('comments'),
		content: v.optional(v.string()),
		placeId: v.optional(v.string()),
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

export const toggleLike = mutation({
	args: {
		commentId: v.id('comments'),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('Unauthorized');
		}

		const comment = await getComment(ctx, args.commentId);
		if (!comment) {
			throw new ConvexError('Comment not found');
		}
		const likes = comment.likes || [];
		const dislikes = comment.dislikes || [];
		if (likes.includes(identity.subject)) {
			await ctx.db.patch(args.commentId, {
				likes: likes.filter(id => id !== identity.subject),
			});
		} else {
			await ctx.db.patch(args.commentId, {
				likes: [...likes, identity.subject],
				dislikes: dislikes.filter(id => id !== identity.subject), // Remove from dislikes if exists
			});
		}
	},
});

export const toggleDislike = mutation({
	args: {
		commentId: v.id('comments'),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('Unauthorized');
		}

		const comment = await getComment(ctx, args.commentId);
		if (!comment) {
			throw new ConvexError('Comment not found');
		}
		const likes = comment.likes || [];
		const dislikes = comment.dislikes || [];
		if (dislikes.includes(identity.subject)) {
			await ctx.db.patch(args.commentId, {
				dislikes: dislikes.filter(id => id !== identity.subject),
			});
		} else {
			await ctx.db.patch(args.commentId, {
				dislikes: [...dislikes, identity.subject],
				likes: likes.filter(id => id !== identity.subject), // Remove from likes if exists
			});
		}
	},
});

export const replyToComment = mutation({
	args: {
		content: v.string(),
		placeId: v.string(),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('Unauthorized');
		}
		await ctx.db.insert('comments', {
			content: args.content,
			userId: identity.subject,
			placeId: args.placeId,
			reply: false,
		});
		await ctx.db.patch(args.placeId as Id<'comments'>, {
			reply: true, // Mark the parent comment as having a reply
		});
	},
});

export const getCommentsByPlace = query({
	args: {
		placeId: v.string(),
		paginationOpts: paginationOptsValidator,
	},

	async handler(ctx, args) {
		const comments = await ctx.db
			.query('comments')
			.withIndex('by_placeId', q => q.eq('placeId', args.placeId))
			.order('desc')
			.paginate(args.paginationOpts);

		const listUserIds = Array.from(new Set(comments.page.map(comment => comment.userId)));
		const listUsers = await Promise.all(
			listUserIds.map(async userId => {
				return await ctx.db
					.query('users')
					.withIndex('by_userId', q => q.eq('userId', userId))
					.unique();
			}),
		);
		return {
			...comments,
			page: comments.page.map(comment => {
				const user = listUsers.find(user => user?.userId === comment.userId);
				const {userId, ...data} = comment;
				return {
					...data,
					user: user ? {id: user._id, ...user} : null, // Include user details
				};
			}),
		};
	},
});

export const deleteComment = mutation({
	args: {commentId: v.id('comments')},
	async handler(ctx, args) {
		await removeComment(ctx, args.commentId);
	},
});
