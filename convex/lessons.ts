import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {example, star, testcase} from "./schema";

export async function getLesson(ctx: QueryCtx | MutationCtx, lessonId: Id<"lessons">) {
	const lesson = await ctx.db.get(lessonId);
	if (!lesson) {
		throw new ConvexError("expected lesson to be defined");
	}
	return lesson;
}

export async function deleteLesson(ctx: MutationCtx, lessonId: Id<"lessons">) {
	const lesson = await ctx.db.get(lessonId);
	if (!lesson) {
		throw new ConvexError("expected lesson to be defined");
	}

	// Delete all related data
	await ctx.db.delete(lesson._id);
	// Delete lesson contents
	const lessonContent = await ctx.db
		.query("lessonContents")
		.withIndex("by_lessonId", q => q.eq("lessonId", lesson._id))
		.first();
	if (lessonContent) {
		await ctx.db.delete(lessonContent._id);
	}
	// Delete lesson examples
	const lessonComments = await ctx.db
		.query("lessonComments")
		.withIndex("by_lessonId", q => q.eq("lessonId", lesson._id))
		.collect();
	if (lessonComments) {
		await Promise.all(lessonComments.map(comment => ctx.db.delete(comment._id)));
	}
	// Delete lesson test cases
	const codeOfUserInLesson = await ctx.db
		.query("codeOfUserInLesson")
		.withIndex("by_lessonId", q => q.eq("lessonId", lesson._id))
		.collect();
	if (codeOfUserInLesson) {
		await Promise.all(codeOfUserInLesson.map(code => ctx.db.delete(code._id)));
	}
}

export const getLessonInfo = query({
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		const lesson = await ctx.db.get(args.lessonId);
		if (!lesson) {
			throw new ConvexError("Lesson not found");
		}
		const lessonContent = await ctx.db
			.query("lessonContents")
			.withIndex("by_lessonId", q => q.eq("lessonId", args.lessonId))
			.first();
		if (!lessonContent) {
			throw new ConvexError("Lesson content not found");
		}
		return {
			lessonId: lesson._id,
			courseId: lesson.courseId,
			topic: lesson.topic,
			stars: lesson.stars,
			difficultlyLevel: lesson.difficultlyLevel,
			content: lessonContent.content,
			structureAnswer: lessonContent.structureAnswer,
			example: lessonContent.example,
			testcase: lessonContent.testcase,
		};
	},
});

export const createLesson = mutation({
	args: {
		courseId: v.id("courses"),
		topic: v.string(),
		stars: star,
		difficultlyLevel: v.number(),

		content: v.string(),
		structureAnswer: v.string(),
		example: v.array(example),
		testcase: v.array(testcase),
	},
	async handler(ctx, args) {
		const lessonId = await ctx.db.insert("lessons", {
			courseId: args.courseId,
			topic: args.topic,
			stars: args.stars,
			difficultlyLevel: args.difficultlyLevel,
		});

		await ctx.db.insert("lessonContents", {
			lessonId,
			content: args.content,
			structureAnswer: args.structureAnswer,
			example: args.example,
			testcase: args.testcase,
		});
		return lessonId;
	},
});

export const updateLesson = mutation({
	args: {
		lessonId: v.id("lessons"),
		topic: v.optional(v.string()),
		stars: v.optional(star),
		difficultlyLevel: v.optional(v.number()),

		content: v.optional(v.string()),
		structureAnswer: v.optional(v.string()),
		example: v.optional(v.array(example)),
		testcase: v.optional(v.array(testcase)),
	},
	async handler(ctx, args) {
		const lesson = await ctx.db.get(args.lessonId);
		if (!lesson) {
			throw new ConvexError("Lesson not found");
		}
		if (!args.topic && !args.stars && !args.difficultlyLevel) {
			await ctx.db.patch(args.lessonId, {
				topic: args.topic || lesson.topic,
				stars: args.stars || lesson.stars,
				difficultlyLevel: args.difficultlyLevel || lesson.difficultlyLevel,
			});
		}

		if (!args.content && !args.structureAnswer && !args.example && !args.testcase) {
			const lessonContent = await ctx.db
				.query("lessonContents")
				.withIndex("by_lessonId", q => q.eq("lessonId", args.lessonId))
				.first();
			if (!lessonContent) {
				throw new ConvexError("Lesson content not found");
			}
			await ctx.db.patch(lessonContent._id, {
				content: args.content || lessonContent.content,
				structureAnswer: args.structureAnswer || lessonContent.structureAnswer,
				example: args.example || lessonContent.example,
				testcase: args.testcase || lessonContent.testcase,
			});
		}
	},
});

export const deleteLessonById = mutation({
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		const lesson = await ctx.db.get(args.lessonId);
		if (!lesson) {
			throw new ConvexError("Lesson not found");
		}
		await deleteLesson(ctx, lesson._id);
	},
});
