import {ConvexError, v} from 'convex/values';
import {Id} from './_generated/dataModel';
import {mutation, MutationCtx, query, QueryCtx} from './_generated/server';

import {removeLesson} from './lessons';
import {CourseStateType} from './schema';

export async function getCourse(ctx: QueryCtx, courseId: Id<'courses'>) {
	const course = await ctx.db.get(courseId);
	if (!course) {
		return null;
	}
	return course;
}

export async function removeCourse(ctx: MutationCtx, courseId: Id<'courses'>) {
	const lessons = await ctx.db
		.query('lessons')
		.withIndex('by_courseId', q => q.eq('courseId', courseId))
		.collect();
	if (lessons.length > 0) {
		await Promise.all(
			lessons.map(async lesson => {
				await removeLesson(ctx, lesson._id);
			}),
		);
	}

	await ctx.db.delete(courseId);
}

export const deleteCourse = mutation({
	args: {courseId: v.id('courses')},
	async handler(ctx, args) {
		await removeCourse(ctx, args.courseId);
	},
});

export const getCourses = query({
	async handler(ctx) {
		const courses = await ctx.db.query('courses').collect();
		if (courses.length === 0) {
			return [];
		}
		return courses;
	},
});

export const useGetPublicCourses = query({
	async handler(ctx) {
		const rawCourses = await ctx.db.query('courses').collect();
		const courses = rawCourses.filter(course => course.status === 'public');
		if (courses.length === 0) {
			return [];
		}
		return courses;
	},
});

export const getCourseById = query({
	args: {courseId: v.id('courses')},
	async handler(ctx, args) {
		const course = await getCourse(ctx, args.courseId);
		if (!course) {
			return null;
		}
		const author = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('userId', course.authorId))
			.unique();
		const language = await ctx.db.get(course.languageId);
		if (!language) {
			throw new ConvexError('Language not found');
		}
		return {
			...course,
			language: language,
			authorId: author?.userId || '',
			authorName: author?.name || '',
			authorImage: author?.image || '',
		};
	},
});

export const createCourse = mutation({
	args: {
		description: v.string(),
		banner: v.string(),
		learner: v.number(),
		name: v.string(),
		document: v.string(),
		authorId: v.string(),
		status: CourseStateType,
		logo: v.string(),
		languageId: v.id('languages'),
	},
	async handler(ctx, args) {
		await ctx.db.insert('courses', {
			...args,
			learner: 0,
		});
	},
});

export const updateCourse = mutation({
	args: {
		courseId: v.id('courses'),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		banner: v.optional(v.string()),
		learner: v.optional(v.number()),
		logo: v.optional(v.string()),
		document: v.optional(v.string()),
		status: v.optional(CourseStateType),
		languageId: v.optional(v.id('languages')),
	},
	async handler(ctx, args) {
		const course = await getCourse(ctx, args.courseId);
		if (!course) {
			throw new ConvexError('Course not found');
		}
		const {courseId, ...fields} = args;
		// Remove undefined fields before patching
		const updateFields = Object.fromEntries(
			Object.entries(fields).filter(([_, v]) => v !== undefined),
		);
		if (Object.keys(updateFields).length === 0) return;
		await ctx.db.patch(course._id, updateFields);
	},
});
