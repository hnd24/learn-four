import {ConvexError, v} from "convex/values";
import {MutationCtx, QueryCtx, internalMutation, query} from "./_generated/server";

export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
	const user = await ctx.db
		.query("users")
		.withIndex("by_userId", q => q.eq("userId", tokenIdentifier))
		.first();

	if (!user) {
		throw new ConvexError("expected user to be defined");
	}

	return user;
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

		await ctx.db.delete(user._id);
	},
});

export const getUserProfile = query({
	args: {userId: v.id("users")},
	async handler(ctx, args) {
		const user = await ctx.db.get(args.userId);

		return {
			name: user?.name,
			image: user?.image,
		};
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
