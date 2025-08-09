import {ConvexError, v} from 'convex/values';
import {Id} from './_generated/dataModel';
import {mutation, MutationCtx, query, QueryCtx} from './_generated/server';
import {StatusType} from './schema';

export async function getTopic(ctx: QueryCtx | MutationCtx, topicId: Id<'topics'>) {
	const topic = await ctx.db.get(topicId);
	if (!topic) {
		throw new ConvexError('expected topic to be defined');
	}
	return topic;
}

export const createTopic = mutation({
	args: {
		name: v.string(),
		status: StatusType,
	},
	async handler(ctx, args) {
		const id = await ctx.db.insert('topics', args);
		return id;
	},
});

export const updateTopic = mutation({
	args: {
		topicId: v.id('topics'),
		name: v.string(),
		status: v.optional(StatusType),
	},
	async handler(ctx, args) {
		const topic = await getTopic(ctx, args.topicId);
		if (!topic) {
			throw new ConvexError('Topic not found');
		}
		// If status is provided, update the status of all problems associated with this topic
		if (args.status) {
			if (topic.status !== args.status) {
				const problems = await ctx.db
					.query('problems')
					.withIndex('by_topicId', q => q.eq('topicId', topic._id))
					.collect();
				if (problems.length > 0) {
					await Promise.all(
						problems.map(problem => {
							if (problem.status !== args.status) {
								return ctx.db.patch(problem._id, {status: args.status});
							}
							return Promise.resolve();
						}),
					);
				}
			}
		}

		const {topicId, ...fields} = args;
		// Remove undefined fields before patching
		const updateFields = Object.fromEntries(
			Object.entries(fields).filter(([_, v]) => v !== undefined),
		);
		await ctx.db.patch(topicId, updateFields);
	},
});

export const getTopics = query({
	async handler(ctx) {
		return await ctx.db.query('topics').collect();
	},
});

export const deleteTopic = mutation({
	args: {topicId: v.id('topics')},
	async handler(ctx, args) {
		const topic = await getTopic(ctx, args.topicId);
		if (!topic) {
			return;
		}
		// Delete the topic
		const problem = await ctx.db
			.query('problems')
			.withIndex('by_topicId', q => q.eq('topicId', topic._id))
			.first();
		if (problem) {
			throw new ConvexError('Cannot delete topic with associated problems');
		}
		await ctx.db.delete(topic._id);
		// Delete all problems associated with this topic
		// const problems = await ctx.db
		// 	.query('problems')
		// 	.withIndex('by_topicId', q => q.eq('topicId', topic._id))
		// 	.collect();
		// Promise.all(problems.map(problem => ctx.db.delete(problem._id)));
	},
});
