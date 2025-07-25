import {filter} from 'convex-helpers/server/filter';
import {getAllOrThrow} from 'convex-helpers/server/relationships';
import {paginationOptsValidator} from 'convex/server';
import {ConvexError, v} from 'convex/values';
import {internal} from './_generated/api';
import {Id} from './_generated/dataModel';
import {internalAction, mutation, MutationCtx, query, QueryCtx} from './_generated/server';
import {removeComment} from './comment';
import {AnswerType, levelType, StateType, StatusType, TemplateType, TestcaseType} from './schema';
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

// This action deletes the Liveblocks room associated with the problem.
export const deleteRoom = internalAction({
	args: {id: v.id('problems')},
	handler: async (_, {id}) => {
		const result = await fetch(`https://api.liveblocks.io/v2/rooms/${id.toString()}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`,
			},
		});

		if (!result.ok) {
			throw new ConvexError('Failed to delete Liveblocks room');
		}
	},
});

export const deleteProblem = mutation({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		await removeProblem(ctx, args.problemId);
		ctx.scheduler.runAfter(0, internal.problems.deleteRoom, {id: args.problemId});
	},
});

export const updateProblem = mutation({
	args: {
		problemId: v.id('problems'),
		name: v.optional(v.string()),
		level: v.optional(levelType),
		topicId: v.optional(v.id('topics')),
		document: v.optional(v.string()),
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
		document: v.string(),
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
		const {testcase, template, ...problem} = await getProblem(ctx, args.problemId);
		const user = await getUser(ctx, problem.authorId);
		if (problem.topicId) {
			const topic = await ctx.db.get(problem.topicId);
			return {
				...problem,
				topic,
				authorId: problem.authorId,
				authorName: user.name,
				authorImage: user.image,
			};
		}
		return {
			...problem,
			topic: null,
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
		topicId: v.optional(v.id('topics')),
		status: v.optional(StatusType),
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, args) {
		const {name, level, topicId, status, paginationOpts} = args;

		const preIndexQuery = ctx.db.query('problems');
		const baseQuery = name
			? preIndexQuery.withSearchIndex('by_name', q => q.search('name', name))
			: preIndexQuery;

		const filteredQuery = filter(baseQuery, problem => {
			if (level && problem.level !== level) return false;
			if (topicId && problem.topicId !== topicId) return false;
			if (status && problem.status !== status) return false;
			return true;
		});

		const rawResults = await filteredQuery.paginate(paginationOpts);
		const topics = await ctx.db.query('topics').collect();
		return {
			...rawResults,
			page: rawResults.page.map(problem => ({
				_id: problem._id,
				name: problem.name,
				level: problem.level,
				status: problem.status,
				topic: topics.find(t => t._id === problem.topicId) || null,
			})),
		};
	},
});

export const queryUserProblems = query({
	args: {
		name: v.optional(v.string()),
		level: v.optional(v.string()),
		topicId: v.optional(v.id('topics')),
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, args) {
		const {name, level, topicId, paginationOpts} = args;
		const identity = await ctx.auth.getUserIdentity();

		const preIndexQuery = ctx.db.query('problems');
		const baseQuery = name
			? preIndexQuery.withSearchIndex('by_name', q => q.search('name', name))
			: preIndexQuery;

		const filteredQuery = filter(baseQuery, problem => {
			if (level && problem.level !== level) return false;
			if (topicId && problem.topicId !== topicId) return false;
			if (problem.status !== 'public') return false;
			return true;
		});

		const rawResults = await filteredQuery.paginate(paginationOpts);
		const topics = await ctx.db.query('topics').collect();
		if (!identity) {
			return {
				...rawResults,
				page: rawResults.page.map(problem => ({
					_id: problem._id,
					name: problem.name,
					level: problem.level,
					status: problem.status,
					topic: topics.find(t => t._id === problem.topicId) || null,
				})),
			};
		}

		const enrichedPage = await Promise.all(
			rawResults.page.map(async problem => {
				if (problem.status === 'private') {
					return {
						_id: problem._id,
						name: problem.name,
						level: problem.level,
						status: problem.status,
						topic: topics.find(t => t._id === problem.topicId) || null,
					};
				}
				const state = await ctx.db
					.query('user_problem')
					.withIndex('by_userId_problemId', q =>
						q.eq('userId', identity.subject).eq('problemId', problem._id),
					)
					.unique();

				return {
					_id: problem._id,
					name: problem.name,
					level: problem.level,
					status: problem.status,
					topic: topics.find(t => t._id === problem.topicId) || null,
					state: state?.state ?? 'not-started',
				};
			}),
		);

		return {
			...rawResults,
			page: enrichedPage,
		};
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
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {problemId} = args;
		return await ctx.db.insert('user_problem', {
			userId: identity.subject,
			problemId: problemId,
			state: 'progress',
		});
	},
});

export const updateUserProblem = mutation({
	args: {
		problemId: v.id('problems'),
		state: StateType,
		code: v.optional(AnswerType),
	},
	async handler(ctx, args) {
		const {problemId, state, code} = args;
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const userProblem = await ctx.db
			.query('user_problem')
			.withIndex('by_userId_problemId', q =>
				q.eq('userId', identity.subject).eq('problemId', problemId),
			)
			.unique();
		if (!userProblem) {
			await ctx.db.insert('user_problem', {
				userId: identity.subject,
				problemId,
				state,
				code: code || {},
			});
			return;
		}
		await ctx.db.patch(userProblem._id, {state, code});
	},
});

export const getUserProblem = query({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {problemId} = args;
		const userProblem = await ctx.db
			.query('user_problem')
			.withIndex('by_userId_problemId', q =>
				q.eq('userId', identity.subject).eq('problemId', problemId),
			)
			.unique();
		if (!userProblem) {
			throw new ConvexError('User problem not found');
		}
		return userProblem;
	},
});

export const getTestcaseByProblemId = query({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		const {problemId} = args;
		const problem = await getProblem(ctx, problemId);
		if (!problem) {
			throw new ConvexError('Problem not found');
		}
		const isPublic = problem.status === 'public';
		return {
			isPublic,
			problemId: problem._id,
			testcase: problem.testcase,
		};
	},
});

export const getTemplateByProblemId = query({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {problemId} = args;
		const problem = await getProblem(ctx, problemId);
		if (!problem) {
			throw new ConvexError('Problem not found');
		}
		const isPublic = problem.status === 'public';
		const code: {[lang: string]: string} = {};
		if (isPublic) {
			const user_problem = await ctx.db
				.query('user_problem')
				.withIndex('by_userId_problemId', q =>
					q.eq('userId', identity.subject).eq('problemId', problem._id),
				)
				.unique();
			Object.keys(problem.template).forEach(lang => {
				if (problem.template[lang]) {
					const {body = ''} = problem.template[lang];
					code[lang] = user_problem?.code?.[lang] || body;
				}
			});
		} else {
			Object.keys(problem.template).forEach(lang => {
				if (problem.template[lang]) {
					const {head = '', tail = ''} = problem.template[lang];
					const answer = problem.answer[lang] || '';
					code[lang] = `${head && head + '\n\n'}${answer && answer + '\n\n'}${tail}`;
				}
			});
		}
		return {
			isPublic,
			code: code,
			template: problem.template,
			answer: problem.answer,
		};
	},
});

export const getStatusProblemById = query({
	args: {problemId: v.id('problems')},
	async handler(ctx, args) {
		const {problemId} = args;
		const problem = await getProblem(ctx, problemId);
		return problem.status;
	},
});

export const getMany = query({
	args: {
		problemIds: v.array(v.id('problems')),
	},
	async handler(ctx, args) {
		const problems = await getAllOrThrow(ctx.db, args.problemIds);
		return problems.map(problem => ({
			id: problem._id,
			name: problem.name,
		}));
	},
});
