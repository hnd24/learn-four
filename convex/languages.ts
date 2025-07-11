import {ConvexError, v} from 'convex/values';
import {Id} from './_generated/dataModel';
import {mutation, MutationCtx, query, QueryCtx} from './_generated/server';

export async function getLanguage(ctx: QueryCtx | MutationCtx, languageId: Id<'languages'>) {
	const language = await ctx.db.get(languageId);
	if (!language) {
		throw new ConvexError('expected language to be defined');
	}
	return language;
}

export const createLanguage = mutation({
	args: {
		name: v.string(),
		idJude0: v.number(),
		value: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert('languages', args);
	},
});

export const updateLanguage = mutation({
	args: {
		languageId: v.id('languages'),
		name: v.optional(v.string()),
		idJude0: v.optional(v.number()),
		value: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const language = await getLanguage(ctx, args.languageId);
		if (!language) {
			throw new ConvexError('Language not found');
		}

		const {languageId, ...fields} = args;
		// Remove undefined fields before patching
		const updateFields = Object.fromEntries(
			Object.entries(fields).filter(([_, v]) => v !== undefined),
		);
		await ctx.db.patch(languageId, updateFields);
	},
});

export const deleteLanguage = mutation({
	args: {languageId: v.id('languages')},
	async handler(ctx, args) {
		const language = await getLanguage(ctx, args.languageId);
		if (!language) {
			return;
		}
		await ctx.db.delete(language._id);
	},
});

export const getLanguages = query({
	async handler(ctx) {
		const languages = await ctx.db.query('languages').collect();
		return languages;
	},
});
