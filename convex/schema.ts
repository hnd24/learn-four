import {defineSchema, defineTable} from 'convex/server';
import {v} from 'convex/values';

export const StatusType = v.union(v.literal('private'), v.literal('public'));
export const CourseStateType = v.union(v.literal('public'), v.literal('private'));
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
		head: v.optional(v.string()),
		body: v.optional(v.string()),
		tail: v.optional(v.string()),
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
	})
		.index('by_userId', ['userId'])
		.searchIndex('by_name', {
			searchField: 'name',
		}),
	/************************************************** */
	roles: defineTable({
		userId: v.string(),
		role: RoleType,
	})
		.index('by_userId', ['userId'])
		.index('by_role', ['role']),
	/************************************************** */
	locked_users: defineTable({
		userId: v.string(),
	}).index('by_userId', ['userId']),
	/************************************************** */
	comments: defineTable({
		content: v.string(),
		userId: v.string(),
		likes: v.optional(v.array(v.string())),
		dislikes: v.optional(v.array(v.string())),
		placeId: v.string(),
		reply: v.boolean(),
	})
		.index('by_userId', ['userId'])
		.index('by_placeId', ['placeId']),
	/************************************************** */
	user_course: defineTable({
		userId: v.string(),
		courseId: v.id('courses'),
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
		topicId: v.optional(v.id('topics')),
		document: v.string(),
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
		value: v.string(),
	}),

	/************************************************** */
	courses: defineTable({
		logo: v.string(),
		name: v.string(),
		description: v.string(),
		banner: v.string(),
		learner: v.number(),
		document: v.string(),
		authorId: v.string(),
		status: CourseStateType,
		languageId: v.id('languages'),
	}),
	/************************************************** */

	lessons: defineTable({
		courseId: v.id('courses'),
		name: v.string(),
		level: levelType,
		document: v.string(),
		answer: v.string(),
		template: v.object({
			head: v.optional(v.string()),
			body: v.optional(v.string()),
			tail: v.optional(v.string()),
		}),
		testcase: TestcaseType,
		status: StatusType,
		languageId: v.id('languages'),
	}).index('by_courseId', ['courseId']),

	/************************************************** */
});
