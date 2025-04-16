import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export const processingNotify = v.union(v.literal("pending"), v.literal("processing"));
export const statusProblem = v.union(
	v.literal("approved"),
	v.literal("pending"),
	v.literal("rejected"),
);
export const role = v.union(v.literal("admin"), v.literal("user"));

export const link = v.object({
	facebook: v.optional(v.string()),
	linkIn: v.optional(v.string()),
	gitHub: v.optional(v.string()),
	youtube: v.optional(v.string()),
	phone: v.optional(v.string()),
});

export const activity = v.object({
	day: v.string(),
	level: v.number(),
});

export const joinedCourse = v.object({
	courseId: v.id("courses"),
	lessonCompleted: v.optional(v.array(v.id("lessons"))),
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

export const star = v.object({
	rating: v.number(),
	count: v.number(),
});

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		image: v.optional(v.string()),
		links: v.optional(link),
		introduce: v.optional(v.string()),
	}).index("by_userId", ["userId"]),

	role: defineTable({
		userId: v.string(),
		role: v.optional(role),
	}).index("by_userId", ["userId"]),

	activities: defineTable({
		userId: v.string(),
		activity: v.optional(v.array(activity)),
	}).index("by_userId", ["userId"]),

	userCourses: defineTable({
		userId: v.string(),
		courseId: v.id("courses"),
		completedLesson: v.optional(v.array(v.id("lessons"))),
		isCompleted: v.boolean(),
	})
		.index("by_userId_courseId", ["userId", "courseId"])
		.index("by_userId", ["userId"])
		.index("by_courseId", ["courseId"]),

	favoriteProblems: defineTable({
		userId: v.string(),
		problemId: v.id("problems"),
	})
		.index("by_userId_problemId", ["userId", "problemId"])
		.index("by_userId", ["userId"])
		.index("by_problemId", ["problemId"]),

	/************************************************** */

	notifiesToAdmin: defineTable({
		problemId: v.id("problems"),
		problemName: v.string(),
		userId: v.string(),
		processing: processingNotify,
	})
		.index("by_userId", ["userId"])
		.index("by_problemId", ["problemId"]),

	notifiesToUser: defineTable({
		topic: v.optional(v.string()),
		content: v.optional(v.string()),
		problemId: v.optional(v.id("problems")),
		problemName: v.optional(v.string()),
		isSeen: v.boolean(),
		userId: v.string(),
	})
		.index("by_userId", ["userId"])
		.index("by_problemId", ["problemId"]),
	/************************************************** */

	problems: defineTable({
		name: v.string(),
		star: v.optional(star),
		type: v.optional(v.string()),
		difficultyLevel: v.number(),
		statusProblem: statusProblem,
		authorId: v.string(),
		authorName: v.string(),
	})
		.index("by_authorId", ["authorId"])
		.searchIndex("by_name", {
			searchField: "name",
			filterFields: ["type"],
		}),

	problemContents: defineTable({
		problemId: v.id("problems"),
		content: v.string(),
		example: v.optional(v.array(example)),
		structureAnswer: v.string(),
		testcase: v.array(testcase),
	}).index("by_problemId", ["problemId"]),

	problemComments: defineTable({
		problemId: v.id("problems"),
		userId: v.string(),
		content: v.string(),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		commentPId: v.optional(v.id("problemComments")),
	})
		.index("by_problemId", ["problemId"])
		.index("by_commentPId", ["commentPId"]),

	solution: defineTable({
		userId: v.string(),
		problemId: v.id("problems"),
		code: v.string(),
		isSolved: v.boolean(),
	})
		.index("by_userId_problemId", ["userId", "problemId"])
		.index("by_problemId", ["problemId"]),

	/************************************************** */

	courses: defineTable({
		language: v.string(),
		logoLanguage: v.string(),
		description: v.string(),
		background: v.string(),
		banner: v.string(),
		star: v.optional(star),
		authorId: v.string(),
		content: v.string(),
		lessons: v.array(v.id("lessons")),
	}),

	courseComments: defineTable({
		courseId: v.id("courses"),
		userId: v.string(),
		content: v.string(),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		commentPId: v.optional(v.id("courseComments")),
	})
		.index("by_courseId", ["courseId"])
		.index("by_commentPId", ["commentPId"]),
	/************************************************** */

	lessons: defineTable({
		courseId: v.id("courses"),
		topic: v.string(),
		stars: star,
		difficultlyLevel: v.number(),
	}).index("by_courseId", ["courseId"]),

	lessonContents: defineTable({
		lessonId: v.id("lessons"),
		content: v.string(),
		structureAnswer: v.string(),
		example: v.array(example),
		testcase: v.array(testcase),
	}).index("by_lessonId", ["lessonId"]),

	lessonComments: defineTable({
		lessonId: v.id("lessons"),
		userId: v.string(),
		likes: v.optional(v.number()),
		dislikes: v.optional(v.number()),
		content: v.string(),
		commentPId: v.optional(v.id("lessonComments")),
	})
		.index("by_lessonId", ["lessonId"])
		.index("by_commentPId", ["commentPId"]),

	codeOfUserInLesson: defineTable({
		userId: v.string(),
		lessonId: v.id("lessons"),
		code: v.string(),
	})
		.index("by_userId_lessonId", ["userId", "lessonId"])
		.index("by_lessonId", ["lessonId"])
		.index("by_userId", ["userId"]),
});
