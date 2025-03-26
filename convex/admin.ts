import {v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {role} from "./schema";

export const confirmAdmin = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return null;
		}

		const isAdmin = await ctx.db
			.query("role")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();

		return isAdmin?.role === role.members[0].value;
	},
});

export const addAdmin = mutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		await ctx.db.insert("role", {
			userId: args.userId,
			role: role.members[0].value,
		});
	},
});

export const removeAdmin = mutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const role = await ctx.db
			.query("role")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();
		if (role) {
			await ctx.db.delete(role._id);
		}
	},
});
