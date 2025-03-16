import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export const processingNotify = v.union(v.literal("processing"), v.literal("pending"));
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
	lessonCompleted: v.optional(v.id("lessons")),
});

export const problemInfo = v.object({
	problemId: v.id("problems"),
	problemName: v.string(),
	difficultyLevel: v.number(),
});

const c = 24;
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
	numberOfReviewer: v.number(),
});

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		image: v.optional(v.string()),
		links: v.optional(link),
		introduce: v.optional(v.string()),
	})
		.index("by_userId", ["userId"])
		.index("by_email", ["email"]),

	role: defineTable({
		userId: v.string(),
		role: role,
	}).index("by_userId", ["userId"]),

	activities: defineTable({
		userId: v.string(),
		activity: v.optional(v.array(activity)),
	}),

	userCourses: defineTable({
		userId: v.string(),
		joinedCourses: v.optional(v.array(joinedCourse)),
		completedCourses: v.optional(v.array(v.id("courses"))),
	}),

	authorProblem: defineTable({
		userId: v.string(),
		problems: v.optional(v.array(v.id("problems"))),
	}),

	solution: defineTable({
		userId: v.string(),
		problemId: v.id("problems"),
		code: v.string(),
		isSolved: v.boolean(),
	}),
	/************************************************** */

	notifiesToAdmin: defineTable({
		problemId: v.id("problems"),
		problemName: v.string(),
		userId: v.string(),
		processing: processingNotify,
	}).index("by_userId", ["userId"]),

	notifiesToUser: defineTable({
		problemId: v.id("problems"),
		problemName: v.string(),
		isApproved: v.boolean(),
		isSeen: v.boolean(),
		userId: v.string(),
	}).index("by_userId", ["userId"]),
	/************************************************** */

	problems: defineTable({
		name: v.string(),
		star: star,
		difficultyLevel: v.number(),
		isApproved: v.boolean(),
		authorId: v.string(),
		authorName: v.string(),
	}),

	problemContents: defineTable({
		problemId: v.id("problems"),
		content: v.string(),
		example: v.optional(v.array(example)),
		structureAnswer: v.string(),
		testcase: v.array(testcase),
	}),

	problemComments: defineTable({
		problemId: v.id("problems"),
		userId: v.string(),
		content: v.string(),
		commentId: v.optional(v.array(v.id("problemComments"))),
	}),

	favoriteProblems: defineTable({
		userId: v.string(),
		problemId: v.id("problems"),
	}),

	/************************************************** */

	courses: defineTable({
		name: v.string(),
		image: v.string(),
		authorId: v.string(),
		difficultyLevel: v.number(),
	}),

	courseContents: defineTable({
		description: v.string(),
		lessons: v.array(
			v.object({
				lessonId: v.id("lessons"),
				lessonTopic: v.string(),
			}),
		),
	}),

	courseComments: defineTable({
		courseId: v.id("courses"),
		userId: v.string(),
		content: v.string(),
		commentId: v.optional(v.array(v.id("courseComments"))),
	}),
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
	}),

	lessonComments: defineTable({
		problemId: v.id("lessons"),
		userId: v.string(),
		content: v.string(),
		commentId: v.optional(v.array(v.id("lessonComments"))),
	}),
	codeOfUserInLesson: defineTable({
		//hello
		userId: v.string(),
		problemId: v.id("lessons"),
		code: v.string(),
	}),
});
