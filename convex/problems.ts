import {paginationOptsValidator} from "convex/server";
import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {example, star, statusProblem, testcase} from "./schema";
import {getUser} from "./users";

export async function getProblem(ctx: QueryCtx | MutationCtx, problemId: Id<"problems">) {
	const problem = await ctx.db.get(problemId);
	if (!problem) {
		throw new ConvexError("expected problem to be defined");
	}
	return problem;
}

export const getUserProblems = query({
	args: {paginationOpts: paginationOptsValidator},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		return await ctx.db
			.query("problems")
			.withIndex("by_authorId", q => q.eq("authorId", identity.subject))
			.order("desc")
			.paginate(args.paginationOpts);
	},
});

export const getProblems = query({
	args: {
		paginationOpts: paginationOptsValidator,
		type: v.optional(v.string()),
		difficultyLevel: v.optional(v.number()),
		star: v.optional(star),
		search: v.optional(v.string()),
	},
	async handler(ctx, args) {
		if (args.difficultyLevel) {
			return await ctx.db
				.query("problems")
				.filter(q => q.eq(q.field("difficultyLevel"), args.difficultyLevel))
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.star) {
			return await ctx.db
				.query("problems")
				.filter(q => q.eq(q.field("star"), args.star))
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.type) {
			return await ctx.db
				.query("problems")
				.filter(q => q.eq(q.field("type"), args.type))
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!))
				.paginate(args.paginationOpts);
		} else if (args.type && args.difficultyLevel) {
			return await ctx.db
				.query("problems")
				.filter(q =>
					q.and(
						q.eq(q.field("type"), args.type),
						q.eq(q.field("difficultyLevel"), args.difficultyLevel),
					),
				)
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.type && args.star) {
			return await ctx.db
				.query("problems")
				.filter(q => q.and(q.eq(q.field("type"), args.type), q.eq(q.field("star"), args.star)))
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.type && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!).eq("type", args.type))
				.paginate(args.paginationOpts);
		} else if (args.difficultyLevel && args.star) {
			return await ctx.db
				.query("problems")
				.filter(q =>
					q.and(
						q.eq(q.field("difficultyLevel"), args.difficultyLevel),
						q.eq(q.field("star"), args.star),
					),
				)
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.difficultyLevel && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!))
				.filter(q => q.eq(q.field("difficultyLevel"), args.difficultyLevel))
				.paginate(args.paginationOpts);
		} else if (args.star && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!))
				.filter(q => q.eq(q.field("star"), args.star))
				.paginate(args.paginationOpts);
		} else if (args.type && args.difficultyLevel && args.star) {
			return await ctx.db
				.query("problems")
				.filter(q =>
					q.and(
						q.eq(q.field("type"), args.type),
						q.eq(q.field("difficultyLevel"), args.difficultyLevel),
						q.eq(q.field("star"), args.star),
					),
				)
				.order("desc")
				.paginate(args.paginationOpts);
		} else if (args.type && args.difficultyLevel && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!).eq("type", args.type))
				.filter(q => q.eq(q.field("difficultyLevel"), args.difficultyLevel))
				.paginate(args.paginationOpts);
		} else if (args.type && args.star && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!).eq("type", args.type))
				.filter(q => q.eq(q.field("star"), args.star))
				.paginate(args.paginationOpts);
		} else if (args.difficultyLevel && args.star && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!))
				.filter(q =>
					q.and(
						q.eq(q.field("difficultyLevel"), args.difficultyLevel),
						q.eq(q.field("star"), args.star),
					),
				)
				.paginate(args.paginationOpts);
		} else if (args.type && args.difficultyLevel && args.star && args.search) {
			return await ctx.db
				.query("problems")
				.withSearchIndex("by_name", q => q.search("name", args.search!).eq("type", args.type))
				.filter(q =>
					q.and(
						q.eq(q.field("difficultyLevel"), args.difficultyLevel),
						q.eq(q.field("star"), args.star),
					),
				)
				.paginate(args.paginationOpts);
		}
		return await ctx.db.query("problems").order("desc").paginate(args.paginationOpts);
	},
});

export const getProblemInfo = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		const problemInfo = await getProblem(ctx, args.problemId);
		const problemContent = await ctx.db
			.query("problemContents")
			.withIndex("by_problemId", q => q.eq("problemId", problemInfo._id))
			.first();
		if (!problemContent) {
			throw new ConvexError("Problem content not found");
		}
		return {...problemInfo, ...problemContent};
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
		if (!user) {
			throw new ConvexError("User not accepted");
		}
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
		name: v.optional(v.string()),
		difficultyLevel: v.optional(v.number()),
		statusProblem: v.optional(statusProblem),

		content: v.optional(v.string()),
		example: v.optional(v.array(example)),
		structureAnswer: v.optional(v.string()),
		testcase: v.optional(v.array(testcase)),
	},
	async handler(ctx, args) {
		const problem = await ctx.db.get(args.problemId);
		if (!problem) {
			throw new ConvexError("Problem not found");
		}
		if (!args.name || !args.difficultyLevel || !args.statusProblem) {
			await ctx.db.patch(args.problemId, {
				name: args.name || problem.name,
				difficultyLevel: args.difficultyLevel || problem.difficultyLevel,
				statusProblem: args.statusProblem || problem.statusProblem,
			});
		}
		if (!args.content || !args.structureAnswer || !args.testcase || !args.example) {
			const problemContent = await ctx.db
				.query("problemContents")
				.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
				.first();

			if (!problemContent) {
				throw new ConvexError("Problem content not found");
			}
			await ctx.db.patch(problemContent._id, {
				content: args.content || problemContent.content,
				example: args.example || problemContent.example,
				structureAnswer: args.structureAnswer || problemContent.structureAnswer,
				testcase: args.testcase || problemContent.testcase,
			});
		}
	},
});

export const deleteProblem = mutation({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		// Delete all comments related to the problem
		await ctx.db.delete(args.problemId);
		// Delete all problem contents related to the problem
		const problemContent = await ctx.db
			.query("problemContents")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.first();
		await ctx.db.delete(problemContent?._id!);
		// Delete all comments related to the problem
		const problemComments = await ctx.db
			.query("problemComments")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.collect();
		await Promise.all(
			problemComments.map(async comment => {
				await ctx.db.delete(comment._id);
			}),
		);
		// Delete all favorite problems related to the problem
		const favoriteProblems = await ctx.db
			.query("favoriteProblems")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.collect();
		await Promise.all(
			favoriteProblems.map(async favoriteProblem => {
				await ctx.db.delete(favoriteProblem._id);
			}),
		);
		// Delete all solutions related to the problem
		const solution = await ctx.db
			.query("solution")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.collect();
		await Promise.all(
			solution.map(async sol => {
				await ctx.db.delete(sol._id);
			}),
		);

		// Delete all notifications related to the problem
		const notifiesToAdmin = await ctx.db
			.query("notifiesToAdmin")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.collect();
		await Promise.all(
			notifiesToAdmin.map(async notify => {
				await ctx.db.delete(notify._id);
			}),
		);
		// Delete all notifications related to the problem
		const notifiesToUser = await ctx.db
			.query("notifiesToUser")
			.withIndex("by_problemId", q => q.eq("problemId", args.problemId))
			.collect();
		await Promise.all(
			notifiesToUser.map(async notify => {
				await ctx.db.delete(notify._id);
			}),
		);
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
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const favoriteProblem = await ctx.db
			.query("favoriteProblems")
			.withIndex("by_userId_problemId", q =>
				q.eq("userId", identity.subject).eq("problemId", args.problemId),
			)
			.first();
		if (favoriteProblem) {
			await ctx.db.delete(favoriteProblem._id);
		} else {
			await ctx.db.insert("favoriteProblems", {
				problemId: args.problemId,
				userId: identity.subject,
			});
		}
	},
});
