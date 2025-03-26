import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";

export async function getProblem(ctx: QueryCtx | MutationCtx, problemId: Id<"problems">) {
	const course = await ctx.db.get(problemId);
	if (!course) {
		throw new ConvexError("expected problem to be defined");
	}
	return course;
}

export const getUserProblems = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const authorProblem = await ctx.db
			.query("authorProblem")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();
		return await Promise.all(
			(authorProblem?.problems || []).map(async problemId => {
				return await getProblem(ctx, problemId);
			}),
		);
	},
});

export const getProblemInfo = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		return await getProblem(ctx, args.problemId);
	},
});

export const getProblemContent = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		const problem = await getProblem(ctx, args.problemId);
		return await ctx.db
			.query("problemContents")
			.withIndex("by_problemId", q => q.eq("problemId", problem._id))
			.first();
	},
});

export const getProblemComments = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		const problem = await getProblem(ctx, args.problemId);
		return await ctx.db
			.query("problemComments")
			.withIndex("by_problemId", q => q.eq("problemId", problem._id))
			.first();
	},
});

export const getUserSolution = query({
	args: {problemId: v.id("problems"), userId: v.string()},
	async handler(ctx, args) {
		return await ctx.db
			.query("solution")
			.withIndex("by_userId_problemId", q =>
				q.eq("userId", args.userId).eq("problemId", args.problemId),
			)
			.first();
	},
});

export const createUserSolution = mutation({
	args: {problemId: v.id("problems"), userId: v.string(), code: v.string(), isSolved: v.boolean()},
	async handler(ctx, args) {
		await ctx.db.insert("solution", {
			userId: args.userId,
			problemId: args.problemId,
			code: args.code,
			isSolved: args.isSolved,
		});
	},
});

export const changeUserSolution = mutation({
	args: {solutionOfUserId: v.id("solution"), code: v.string(), isSolved: v.boolean()},
	async handler(ctx, args) {
		const solution = await ctx.db.get(args.solutionOfUserId);
		if (!solution) {
			throw new ConvexError("Solution not found");
		}
		await ctx.db.patch(solution._id, {
			code: args.code,
			isSolved: args.isSolved,
		});
	},
});

export const getUserFavoriteProblems = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		return await ctx.db
			.query("favoriteProblems")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();
	},
});

export const toggleFavoriteProblem = mutation({
	args: {problemId: v.id("problems"), userId: v.string()},
	async handler(ctx, args) {
		const listFavoriteProblems = await ctx.db
			.query("favoriteProblems")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();
		if (!listFavoriteProblems?.problemId) {
			await ctx.db.insert("favoriteProblems", {
				userId: args.userId,
				problemId: [args.problemId],
			});
		} else {
			const isFavorite = listFavoriteProblems?.problemId.includes(args.problemId);
			if (isFavorite) {
				const newFavoriteProblems = listFavoriteProblems?.problemId.filter(
					problemId => problemId !== args.problemId,
				);
				await ctx.db.patch(listFavoriteProblems._id, {problemId: newFavoriteProblems});
			} else {
				const newFavoriteProblems = [...listFavoriteProblems?.problemId, args.problemId];
				await ctx.db.patch(listFavoriteProblems._id, {problemId: newFavoriteProblems});
			}
		}
	},
});
