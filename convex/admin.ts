import {v} from "convex/values";
import {mutation, query} from "./_generated/server";

export const confirmAdmin = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const isAdmin = await ctx.db
			.query("users")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();
		if (isAdmin) {
			return true;
		}
		return false;
	},
});

export const addAdmin = mutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const user = await ctx.db
			.query("users")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();
		if (!user) {
			throw new Error("User not found");
		}
		if (user?.role === "admin") {
			throw new Error("User is already an admin");
		}
		if (user?.locked) {
			throw new Error("User is locked");
		}

		if (user) {
			await ctx.db.patch(user._id, {
				role: "admin",
			});
		}
	},
});

export const lockUser = mutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const user = await ctx.db
			.query("users")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();
		if (!user) {
			throw new Error("User not found");
		}
		if (user?.locked) {
			throw new Error("User is already locked");
		}
		if (user?.role === "admin") {
			throw new Error("User is admin");
		}

		if (user) {
			await ctx.db.patch(user._id, {
				locked: true,
			});
		}
	},
});

export const removeAdmin = mutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const user = await ctx.db
			.query("users")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();
		if (user) {
			await ctx.db.patch(user._id, {
				role: "user",
			});
		}
	},
});
