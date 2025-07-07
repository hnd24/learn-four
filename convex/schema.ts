import {defineSchema, defineTable} from 'convex/server';
import {v} from 'convex/values';

export const StatusType = v.union(v.literal('private'), v.literal('public'));
export const CourseStateType = v.union(
	v.literal('public'),
	v.literal('pending'),
	v.literal('private'),
);
export const StateType = v.union(v.literal('completed'), v.literal('progress'));
export const RoleType = v.union(v.literal('super_admin'), v.literal('admin'), v.literal('user'));
export const levelType = v.union(v.literal('easy'), v.literal('medium'), v.literal('hard'));

export const LinkType = v.object({
	Facebook: v.optional(v.string()),
	LinkedIn: v.optional(v.string()),
	GitHub: v.optional(v.string()),
	Youtube: v.optional(v.string()),
	Phone: v.optional(v.string()),
});

export const AnswerType = v.record(v.string(), v.string());

export const TemplateType = v.record(
	v.string(),
	v.object({
		head: v.string(),
		body: v.string(),
		tail: v.string(),
	}),
);

export const TestcaseType = v.array(
	v.object({
		id: v.string(),
		inputs: v.array(
			v.object({
				id: v.string(),
				label: v.string(),
				value: v.string(),
			}),
		),
		expected: v.string(),
	}),
);

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.string(),
		email: v.string(),
		image: v.optional(v.string()),
		links: v.optional(LinkType),
		introduce: v.optional(v.string()),
		role: v.optional(RoleType),
		locked: v.optional(v.boolean()),
	}).index('by_userId', ['userId']),
	/************************************************** */
	comments: defineTable({
		content: v.string(),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		userId: v.string(),
		parent: v.optional(v.string()),
		placeId: v.string(),
		reply: v.boolean(),
	})
		.index('by_parent', ['parent'])
		.index('by_userId', ['userId'])
		.index('by_placeId', ['placeId']),
	/************************************************** */
	user_course: defineTable({
		userId: v.string(),
		courseId: v.id('courses'),
		state: StateType,
	})
		.index('by_userId_courseId', ['userId', 'courseId'])
		.index('by_userId', ['userId']),

	user_lesson: defineTable({
		userId: v.string(),
		lessonId: v.id('lessons'),
		state: StateType,
		code: v.optional(v.string()),
	})
		.index('by_userId_lessonId', ['userId', 'lessonId'])
		.index('by_userId', ['userId']),

	user_problem: defineTable({
		userId: v.string(),
		problemId: v.id('problems'),
		state: StateType,
		code: v.optional(AnswerType),
	})
		.index('by_userId_problemId', ['userId', 'problemId'])
		.index('by_userId', ['userId']),

	/************************************************** */
	problems: defineTable({
		name: v.string(),
		level: levelType,
		topicId: v.id('topics'),
		content: v.string(),
		answer: AnswerType,
		template: TemplateType,
		testcase: TestcaseType,
		status: StatusType,
		authorId: v.string(),
	})
		.index('by_authorId', ['authorId'])
		.index('by_topicId', ['topicId'])
		.searchIndex('by_name', {
			searchField: 'name',
			filterFields: ['topicId', 'level', 'status'],
		}),
	/************************************************** */
	topics: defineTable({
		name: v.string(),
		status: StatusType,
	}),
	/************************************************** */
	languages: defineTable({
		name: v.string(),
		idJude0: v.number(),
		extension: v.string(),
	}),

	/************************************************** */
	courses: defineTable({
		logo: v.string(),
		description: v.string(),
		banner: v.string(),
		learner: v.number(),
		content: v.string(),
		authorId: v.string(),
		status: CourseStateType,
		language: v.id('languages'),
	}),
	/************************************************** */

	lessons: defineTable({
		courseId: v.id('courses'),
		name: v.string(),
		level: levelType,
		content: v.string(),
		answer: v.string(),
		template: v.object({
			head: v.string(),
			body: v.string(),
			tail: v.string(),
		}),
		testcase: TestcaseType,
		status: StatusType,
		language: v.id('languages'),
	}).index('by_courseId', ['courseId']),

	/************************************************** */
});
