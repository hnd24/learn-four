import {filter} from 'convex-helpers/server/filter';
import {paginationOptsValidator} from 'convex/server';
import {ConvexError, v} from 'convex/values';
import {Id} from './_generated/dataModel';
import {mutation, MutationCtx, query, QueryCtx} from './_generated/server';
import {removeComment} from './comment';
import {AnswerType, levelType, StatusType, TemplateType, TestcaseType} from './schema';
import {getUser} from './users';

export async function getProblem(ctx: QueryCtx | MutationCtx, problemId: Id<'problems'>) {
	const problem = await ctx.db.get(problemId);
	if (!problem) {
		throw new ConvexError('expected problem to be defined');
	}
	return problem;
}

export async function removeProblem(ctx: MutationCtx, problemId: Id<'problems'>) {
	const problem = await getProblem(ctx, problemId);
	if (!problem) {
		return;
	}
	// Remove all comments associated with this problem
	const comments = await ctx.db
		.query('comments')
		.withIndex('by_placeId', q => q.eq('placeId', problem._id))
		.collect();
	if (comments.length > 0) {
		await Promise.all(
			comments.map(async comment => {
				await removeComment(ctx, comment._id);
			}),
		);
	}

	// Delete the problem
	await ctx.db.delete(problem._id);
}

export const deleteProblem = mutation({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		await removeProblem(ctx, args.problemId);
	},
});

export const updateProblem = mutation({
	args: {
		problemId: v.id('problems'),
		name: v.optional(v.string()),
		level: v.optional(levelType),
		topic: v.optional(v.id('topics')),
		content: v.optional(v.string()),
		answer: v.optional(AnswerType),
		template: v.optional(TemplateType),
		testcase: v.optional(TestcaseType),
		status: v.optional(StatusType),
		authorId: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const {problemId, ...fields} = args;
		// Remove undefined fields before patching
		const updateFields = Object.fromEntries(
			Object.entries(fields).filter(([_, v]) => v !== undefined),
		);
		if (Object.keys(updateFields).length === 0) return;
		await ctx.db.patch(problemId, updateFields);
	},
});

export const createProblem = mutation({
	args: {
		name: v.string(),
		level: levelType,
		topic: v.id('topics'),
		content: v.string(),
		answer: AnswerType,
		template: TemplateType,
		testcase: TestcaseType,
		status: StatusType,
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const user = await getUser(ctx, identity.subject);
		await ctx.db.insert('problems', {
			authorId: user.userId,
			...args,
		});
	},
});

export const getDetailProblemById = query({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		const problem = await getProblem(ctx, args.problemId);
		const user = await getUser(ctx, problem.authorId);
		const topic = await ctx.db.get(problem.topic);
		return {
			...problem,
			topic,
			authorId: problem.authorId,
			authorName: user.name,
			authorImage: user.image,
		};
	},
});

export const queryProblems = query({
	args: {
		name: v.optional(v.string()),
		level: v.optional(v.string()),
		topic: v.optional(v.id('topics')),
		status: v.optional(StatusType),
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, args) {
		const {name, level, topic, status, paginationOpts} = args;
		const identity = await ctx.auth.getUserIdentity();
		const preIndexQuery = ctx.db.query('problems');
		const baseQuery = name
			? preIndexQuery.withSearchIndex('by_name', q => q.search('name', name))
			: preIndexQuery;

		const filteredQuery = filter(baseQuery, problem => {
			if (level && problem.level !== level) {
				return false;
			}
			if (topic && problem.topic !== topic) {
				return false;
			}
			if (status && problem.status !== status) {
				return false;
			}
			return true;
		});

		const rawResults = await filteredQuery.paginate(paginationOpts);
		if (!identity) {
			return rawResults;
		}
		const user = await getUser(ctx, identity.subject);
		return await Promise.all(
			rawResults.page.map(async problem => {
				const state = await ctx.db
					.query('user_problem')
					.withIndex('by_userId_problemId', q =>
						q.eq('userId', user.userId).eq('problemId', problem._id),
					)
					.unique();
				return {
					_id: problem._id,
					name: problem.name,
					level: problem.level,
					topic: problem.topic,
					state: state ? state.state : 'unsolved',
				};
			}),
		);
	},
});

export const checkUserProblem = query({
	args: {problemId: v.id('problems'), userId: v.string()},
	async handler(ctx, args) {
		const {problemId, userId} = args;
		const userProblem = await ctx.db
			.query('user_problem')
			.withIndex('by_userId_problemId', q =>
				q.eq('userId', userId).eq('problemId', problemId),
			)
			.unique();
		if (!userProblem) {
			return false;
		}
		return true;
	},
});

export const createUserProblem = mutation({
	args: {problemId: v.id('problems'), userId: v.string()},
	async handler(ctx, args) {
		const {problemId, userId} = args;
		await ctx.db.insert('user_problem', {
			userId: userId,
			problemId: problemId,
			state: 'progress',
		});
	},
});

export const getUserProblem = query({
	args: {problemId: v.id('problems'), userId: v.string()},
	async handler(ctx, args) {
		const {problemId, userId} = args;
		const userProblem = await ctx.db
			.query('user_problem')
			.withIndex('by_userId_problemId', q =>
				q.eq('userId', userId).eq('problemId', problemId),
			)
			.unique();
		if (!userProblem) {
			return null;
		}
		return userProblem;
	},
});
