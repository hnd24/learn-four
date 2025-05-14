import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {removeCComment} from "./comment";
import {answer, statusPlace, testcase} from "./schema";
import {getUser} from "./users";

export async function getProblem(ctx: QueryCtx | MutationCtx, problemId: Id<"problems">) {
	const problem = await ctx.db.get(problemId);
	if (!problem) {
		throw new ConvexError("expected problem to be defined");
	}
	return problem;
}

export async function removeProblem(ctx: MutationCtx, lessonId: Id<"problems">) {
	const problemComments = await ctx.db
		.query("problemComments")
		.withIndex("by_problemId", q => q.eq("problemId", lessonId))
		.collect();
	if (problemComments && problemComments.length > 0) {
		await Promise.all(
			problemComments.map(async lessonComment => {
				ctx.db.delete(lessonComment._id);
				await removeCComment(ctx, lessonComment.commentId);
			}),
		);
	}
	await ctx.db.delete(lessonId);
}

export const deleteProblem = mutation({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		await removeProblem(ctx, args.problemId);
	},
});

export const getProblemInfoById = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		const problem = await getProblem(ctx, args.problemId);
		const user = await getUser(ctx, problem.authorId);
		return {
			...problem,
			authorId: problem.authorId,
			authorName: user.name,
			authorImage: user.image,
		};
	},
});

export const updateProblem = mutation({
	args: {
		problemId: v.id("problems"),
		name: v.optional(v.string()),
		star: v.optional(v.number()),
		level: v.optional(v.string()),
		topic: v.optional(v.string()),
		content: v.optional(v.string()),

		testcase: v.optional(v.array(testcase)),
		status: v.optional(statusPlace),
		authorId: v.optional(v.string()),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.problemId, {...args});
	},
});

export const createProblem = mutation({
	args: {
		name: v.string(),
		star: v.number(),
		level: v.string(),
		topic: v.optional(v.string()),
		content: v.string(),
		testcase: v.array(testcase),
		answer: answer,
		testcaseSample: v.array(testcase),
		status: statusPlace,
		nameFn: v.string(),
		authorId: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("problems", {
			...args,
		});
	},
});

export const getProblems = query({
	args: {problemId: v.id("problems")},
	async handler(ctx, args) {
		const problem = await getProblem(ctx, args.problemId);
		const user = await getUser(ctx, problem.authorId);
		return {
			...problem,
			authorId: problem.authorId,
			authorName: user.name,
			authorImage: user.image,
		};
	},
});
