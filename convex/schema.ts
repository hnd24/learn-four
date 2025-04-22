import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export const processingNotify = v.union(
	v.literal("pending"),
	v.literal("processing"),
	v.literal("done"),
);
export const statusPlace = v.union(
	v.literal("pending"),
	v.literal("approved"),
	v.literal("rejected"),
);
export const role = v.union(v.literal("admin"), v.literal("user"));

export const link = v.object({
	facebook: v.optional(v.string()),
	linkedIn: v.optional(v.string()),
	gitHub: v.optional(v.string()),
	youtube: v.optional(v.string()),
	phone: v.optional(v.string()),
});

export const activity = v.object({
	day: v.string(),
	level: v.number(),
});

export const example = v.object({
	input: v.string(),
	output: v.string(),
	explanation: v.string(),
});

export const testcase = v.object({
	input: v.string(),
	output: v.string(),
	isHidden: v.optional(v.boolean()),
});

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		image: v.optional(v.string()),
		links: v.optional(link),
		introduce: v.optional(v.string()),
		activities: v.optional(v.array(activity)),
		locked: v.optional(v.boolean()),
		role: v.optional(role),
	}).index("by_userId", ["userId"]),

	userCourses: defineTable({
		userId: v.string(),
		courseId: v.id("courses"),
		isCompleted: v.boolean(),
	})
		.index("by_userId_courseId", ["userId", "courseId"])
		.index("by_userId", ["userId"]),

	userLessons: defineTable({
		userId: v.string(),
		lessonId: v.id("lessons"),
		isCompleted: v.boolean(),
		code: v.string(),
	})
		.index("by_userId_lessonId", ["userId", "lessonId"])
		.index("by_userId", ["userId"]),

	userProblems: defineTable({
		userId: v.string(),
		state: v.string(),
		problemId: v.id("problems"),
		favorite: v.optional(v.boolean()),
		code: v.string(),
		isSolved: v.boolean(),
	})
		.index("by_userId_problemId", ["userId", "problemId"])
		.index("by_userId", ["userId"]),

	/************************************************** */
	comments: defineTable({
		content: v.string(),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		userId: v.string(),
		CCommentId: v.optional(v.array(v.id("comments"))),
	}).index("by_userId", ["userId"]),
	/************************************************** */

	notifiesToAdmin: defineTable({
		problemId: v.id("problems"),
		problemName: v.string(),
		userId: v.string(),
		processing: processingNotify,
	}).index("by_userId", ["userId"]),

	notifiesToUser: defineTable({
		topic: v.optional(v.string()),
		content: v.optional(v.string()),
		isSeen: v.boolean(),
		userId: v.string(),
	}).index("by_userId", ["userId"]),

	/************************************************** */

	problems: defineTable({
		name: v.string(),
		star: v.number(),
		level: v.string(),
		topic: v.optional(v.string()),
		content: v.string(),
		example: v.optional(v.array(example)),
		structureAnswer: v.string(),
		testcase: v.array(testcase),
		status: statusPlace,
		authorId: v.string(),
	})
		.index("by_authorId", ["authorId"])
		.searchIndex("by_name", {
			searchField: "name",
			filterFields: ["topic", "level", "status", "star"],
		}),

	problemComments: defineTable({
		problemId: v.id("problems"),
		commentId: v.id("comments"),
	}).index("by_problemId", ["problemId"]),

	/************************************************** */

	courses: defineTable({
		language: v.string(),
		logoLanguage: v.string(),
		description: v.string(),
		background: v.string(),
		banner: v.string(),
		star: v.number(),
		learner: v.number(),
		authorId: v.string(),
		authorName: v.string(),
		authorImage: v.string(),
		content: v.string(),
		status: statusPlace,
		lessons: v.optional(v.array(v.id("lessons"))),
	}),

	courseComments: defineTable({
		courseId: v.id("courses"),
		commentId: v.id("comments"),
	}).index("by_courseId", ["courseId"]),
	/************************************************** */

	lessons: defineTable({
		courseId: v.id("courses"),
		topic: v.string(),
		name: v.string(),
		stars: v.number(),
		learner: v.number(),
		level: v.number(),
		content: v.string(),
		structureAnswer: v.string(),
		example: v.array(example),
		status: statusPlace,
		testcase: v.array(testcase),
	}).index("by_courseId", ["courseId"]),

	lessonComments: defineTable({
		lessonId: v.id("lessons"),
		commentId: v.id("comments"),
	}).index("by_lessonId", ["lessonId"]),
});
