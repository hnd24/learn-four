import {getAllOrThrow} from 'convex-helpers/server/relationships';
import {ConvexError, v} from 'convex/values';
import {Id} from './_generated/dataModel';
import {mutation, MutationCtx, query, QueryCtx} from './_generated/server';
import {removeComment} from './comment';
import {levelType, StateType, StatusType, TestcaseType} from './schema';

export async function getLesson(ctx: QueryCtx | MutationCtx, lessonId: Id<'lessons'>) {
	const lesson = await ctx.db.get(lessonId);
	if (!lesson) {
		throw new ConvexError('expected lesson to be defined');
	}
	return lesson;
}

export async function removeLesson(ctx: MutationCtx, lessonId: Id<'lessons'>) {
	const comments = await ctx.db
		.query('comments')
		.withIndex('by_placeId', q => q.eq('placeId', lessonId))
		.collect();
	if (comments.length > 0) {
		// Recursively delete all comments associated with this lesson
		await Promise.all(
			comments.map(async comment => {
				await removeComment(ctx, comment._id);
			}),
		);
	}
	await ctx.db.delete(lessonId);
}

export const deleteLesson = mutation({
	args: {lessonId: v.id('lessons')},
	async handler(ctx, args) {
		await removeLesson(ctx, args.lessonId);
	},
});

export const createLesson = mutation({
	args: {
		courseId: v.id('courses'),
		name: v.string(),
		level: levelType,
		document: v.string(),
		answer: v.string(),
		template: v.object({
			head: v.string(),
			body: v.string(),
			tail: v.string(),
		}),
		testcase: TestcaseType,
		status: StatusType,
		languageId: v.id('languages'),
	},
	async handler(ctx, args) {
		await ctx.db.insert('lessons', {
			...args,
		});
	},
});

export const updateLesson = mutation({
	args: {
		lessonId: v.id('lessons'),
		courseId: v.optional(v.id('courses')),
		name: v.optional(v.string()),
		level: v.optional(levelType),
		document: v.optional(v.string()),
		answer: v.optional(v.string()),
		template: v.optional(
			v.object({
				head: v.optional(v.string()),
				body: v.optional(v.string()),
				tail: v.optional(v.string()),
			}),
		),
		testcase: v.optional(TestcaseType),
		status: v.optional(StatusType),
		languageId: v.optional(v.id('languages')),
	},
	async handler(ctx, args) {
		const {lessonId, ...updateFields} = args;
		// Remove undefined fields
		const updates = Object.fromEntries(
			Object.entries(updateFields).filter(([_, v]) => v !== undefined),
		);
		await ctx.db.patch(lessonId, updates);
	},
});

export const getUserLessonInCourse = query({
	args: {courseId: v.id('courses')},
	async handler(ctx, args) {
		const course = await ctx.db.get(args.courseId);
		if (!course) {
			throw new ConvexError('Course not found');
		}
		const lessons = await ctx.db
			.query('lessons')
			.withIndex('by_courseId', q => q.eq('courseId', args.courseId))
			.filter(q => q.eq(q.field('status'), 'public'))
			.collect();
		if (course.status !== 'public') throw new ConvexError('Course is not public');
		// Check if user is authenticated
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new ConvexError('User not authenticated');
		// Fetch user lessons for each lesson in the course
		const userLessons = await Promise.all(
			lessons.map(async lesson => {
				const user_lessons = await ctx.db
					.query('user_lesson')
					.withIndex('by_userId_lessonId', q =>
						q.eq('userId', identity.subject ?? '').eq('lessonId', lesson._id),
					)
					.unique();
				return {
					_id: lesson._id,
					_creationTime: lesson._creationTime,
					name: lesson.name,
					level: lesson.level,
					status: lesson.status,
					state: user_lessons?.state ?? 'not-started',
				};
			}),
		);
		return {
			courseId: course._id,
			status: course.status,
			lessons: userLessons,
		};
	},
});

export const getLessonInCourse = query({
	args: {courseId: v.id('courses')},
	async handler(ctx, args) {
		const course = await ctx.db.get(args.courseId);
		if (!course) {
			throw new ConvexError('Course not found');
		}
		const lessons = await ctx.db
			.query('lessons')
			.withIndex('by_courseId', q => q.eq('courseId', args.courseId))
			.collect();
		if (course.status === 'public') {
			const identity = await ctx.auth.getUserIdentity();
			if (!identity) {
				throw new ConvexError('User not authenticated');
			}
			const userLessons = await Promise.all(
				lessons.map(async lesson => {
					const user_lessons = await ctx.db
						.query('user_lesson')
						.withIndex('by_userId_lessonId', q =>
							q.eq('userId', identity.subject ?? '').eq('lessonId', lesson._id),
						)
						.unique();
					return {
						_id: lesson._id,
						_creationTime: lesson._creationTime,
						name: lesson.name,
						level: lesson.level,
						status: lesson.status,
						state: user_lessons?.state ?? 'not-started',
					};
				}),
			);
			return {
				courseId: course._id,
				status: course.status,
				lessons: userLessons,
			};
		} else {
			return {
				courseId: course._id,
				status: course.status,
				lessons: lessons.map(lesson => ({
					_id: lesson._id,
					_creationTime: lesson._creationTime,
					name: lesson.name,
					level: lesson.level,
					status: lesson.status,
				})),
			};
		}
	},
});

export const getLessonById = query({
	args: {lessonId: v.id('lessons')},
	async handler(ctx, args) {
		const {testcase, template, ...lesson} = await getLesson(ctx, args.lessonId);
		const language = await ctx.db.get(lesson.languageId);
		return {
			...lesson,
			language,
		};
	},
});

export const getTestcaseByLessonId = query({
	args: {lessonId: v.id('lessons')},
	async handler(ctx, args) {
		const lesson = await getLesson(ctx, args.lessonId);
		if (!lesson.testcase) {
			throw new ConvexError('Testcase not found for this lesson');
		}
		const isPublic = lesson.status === 'public';
		return {
			isPublic,
			testcase: lesson.testcase,
			lessonId: lesson._id,
		};
	},
});

export const getTemplateByLessonId = query({
	args: {lessonId: v.id('lessons')},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {lessonId} = args;
		const lesson = await getLesson(ctx, lessonId);
		if (!lesson) {
			throw new ConvexError('Lesson not found');
		}
		const isPublic = lesson.status === 'public';
		let code: string = '';
		if (isPublic) {
			const user_problem = await ctx.db
				.query('user_lesson')
				.withIndex('by_userId_lessonId', q =>
					q.eq('userId', identity.subject).eq('lessonId', lesson._id),
				)
				.unique();
			const {body = ''} = lesson.template;
			code = user_problem?.code ?? body;
		} else {
			const {head = '', tail = ''} = lesson.template;
			const answer = lesson.answer || '';
			code = `${head && head + '\n\n'}${answer && answer + '\n\n'}${tail}`;
		}
		return {
			isPublic,
			code,
			answer: lesson.answer,
			template: lesson.template,
		};
	},
});

export const checkUserLesson = query({
	args: {lessonId: v.id('lessons'), userId: v.id('users')},
	async handler(ctx, args) {
		const userLesson = await ctx.db
			.query('user_lesson')
			.withIndex('by_userId_lessonId', q =>
				q.eq('userId', args.userId).eq('lessonId', args.lessonId),
			)
			.unique();
		if (!userLesson) {
			return false;
		}
		return true;
	},
});

export const createUserLesson = mutation({
	args: {
		lessonId: v.id('lessons'),
		state: StateType,
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {lessonId, state} = args;
		return await ctx.db.insert('user_lesson', {
			userId: identity.subject,
			lessonId: lessonId,
			state: state,
		});
	},
});

export const getUserLesson = query({
	args: {lessonId: v.id('lessons')},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {lessonId} = args;
		const userLesson = await ctx.db
			.query('user_lesson')
			.withIndex('by_userId_lessonId', q =>
				q.eq('userId', identity.subject).eq('lessonId', lessonId),
			)
			.unique();
		if (!userLesson) {
			throw new ConvexError('User lesson not found');
		}
		return userLesson;
	},
});

export const updateUserLesson = mutation({
	args: {
		lessonId: v.id('lessons'),
		state: StateType,
		code: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('User not authenticated');
		}
		const {lessonId, state, code} = args;
		const userLesson = await ctx.db
			.query('user_lesson')
			.withIndex('by_userId_lessonId', q =>
				q.eq('userId', identity.subject).eq('lessonId', lessonId),
			)
			.unique();
		if (!userLesson) {
			await ctx.db.insert('user_lesson', {
				userId: identity.subject,
				lessonId,
				state,
				code: code || '',
			});
			return;
		}
		await ctx.db.patch(userLesson._id, {
			state,
			code,
		});
	},
});

export const getMany = query({
	args: {lessonIds: v.array(v.id('lessons'))},
	async handler(ctx, args) {
		const lessons = await getAllOrThrow(ctx.db, args.lessonIds);
		return lessons.map(lesson => ({
			id: lesson._id,
			name: lesson.name,
		}));
	},
});
