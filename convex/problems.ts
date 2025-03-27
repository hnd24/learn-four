import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {example, star, statusProblem, testcase} from "./schema";
import {getUser} from "./users";

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

export const createProblem = mutation({
	args: {
		name: v.string(),
		star: star,
		difficultyLevel: v.number(),
		statusProblem: statusProblem,

		content: v.string(),
		example: v.optional(v.array(example)),
		structureAnswer: v.string(),
		testcase: v.array(testcase),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("User not found");
		}
		const user = await getUser(ctx, identity.subject);
		const problemId = await ctx.db.insert("problems", {
			name: args.name,
			star: args.star,
			difficultyLevel: args.difficultyLevel,
			statusProblem: args.statusProblem,
			authorId: user._id,
			authorName: user.name!,
		});

		await ctx.db.insert("problemContents", {
			problemId: problemId,
			content: args.content,
			example: args.example,
			structureAnswer: args.structureAnswer,
			testcase: args.testcase,
		});
	},
});

export const changeProblemInfo = mutation({
	args: {
		problemId: v.id("problems"),
		name: v.string(),
		difficultyLevel: v.number(),
		statusProblem: statusProblem,
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.problemId, {
			name: args.name,
			difficultyLevel: args.difficultyLevel,
			statusProblem: args.statusProblem,
		});
	},
});

export const changeProblemContent = mutation({
	args: {
		problemId: v.id("problems"),
		content: v.string(),
		example: v.optional(v.array(example)),
		structureAnswer: v.string(),
		testcase: v.array(testcase),
	},
	async handler(ctx, args) {
		const problemContent = await ctx.db
			.query("problemContents")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.first();
		await ctx.db.patch(problemContent?._id!, {
			content: args.content,
			example: args.example,
			structureAnswer: args.structureAnswer,
			testcase: args.testcase,
		});
	},
});

export const deleteProblem = mutation({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		await ctx.db.delete(args.problemId);
		const problemContent = await ctx.db
			.query("problemContents")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.first();
		await ctx.db.delete(problemContent?._id!);
	},
});

export const changeStatusProblem = mutation({
	args: {problemId: v.id("problems"), status: statusProblem},
	async handler(ctx, args) {
		await ctx.db.patch(args.problemId, {statusProblem: args.status});
	},
});

export const changeStarProblem = mutation({
	args: {problemId: v.id("problems"), star: star},
	async handler(ctx, args) {
		await ctx.db.patch(args.problemId, {star: args.star});
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

export const createProblemComment = mutation({
	args: {
		problemId: v.id("problems"),
		userId: v.string(),
		content: v.string(),
		commentId: v.optional(v.array(v.id("problemComments"))),
	},
	async handler(ctx, args) {
		await ctx.db.insert("problemComments", {
			problemId: args.problemId,
			userId: args.userId,
			content: args.content,
			commentId: args.commentId,
		});
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
		await ctx.db.delete(args.commentId);
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
