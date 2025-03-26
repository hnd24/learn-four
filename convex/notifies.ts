import {v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {processingNotify} from "./schema";

export const getNotifiesToUser = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		return await ctx.db
			.query("notifiesToUser")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();
	},
});

export const seenNotifyToUser = mutation({
	args: {notifiesToUser: v.id("notifiesToUser")},
	async handler(ctx, args) {
		await ctx.db.patch(args.notifiesToUser, {isSeen: true});
	},
});

export const createNotifyToUser = mutation({
	args: {
		topic: v.string(),
		content: v.optional(v.string()),
		problemId: v.optional(v.id("problems")),
		problemName: v.optional(v.string()),
		isSeen: v.boolean(),
		userId: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("notifiesToUser", {
			...args,
			isSeen: false,
		});
	},
});

export const deleteNotifyToUser = mutation({
	args: {notifiesToUser: v.id("notifiesToUser")},
	async handler(ctx, args) {
		await ctx.db.delete(args.notifiesToUser);
	},
});

export const getNotifiesToAdmin = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		return await ctx.db
			.query("notifiesToAdmin")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();
	},
});

export const createNotifyToAdmin = mutation({
	args: {
		problemId: v.id("problems"),
		problemName: v.string(),
		userId: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("notifiesToAdmin", {
			...args,
			processing: processingNotify.members[0].value,
		});
	},
});
export const changeProcessingNotify = mutation({
	args: {notifiesToAdmin: v.id("notifiesToAdmin"), isProcessing: processingNotify},
	async handler(ctx, args) {
		await ctx.db.patch(args.notifiesToAdmin, {processing: args.isProcessing});
	},
});

export const deleteNotifyToAdmin = mutation({
	args: {notifiesToAdmin: v.id("notifiesToAdmin")},
	async handler(ctx, args) {
		await ctx.db.delete(args.notifiesToAdmin);
	},
});
