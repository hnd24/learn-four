import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {removeComment} from "./comment";
import {levelType, StatusType} from "./schema";

export async function getLesson(ctx: QueryCtx | MutationCtx, lessonId: Id<"lessons">) {
	const lesson = await ctx.db.get(lessonId);
	if (!lesson) {
		throw new ConvexError("expected lesson to be defined");
	}
	return lesson;
}

export async function removeLesson(ctx: MutationCtx, lessonId: Id<"lessons">) {
	const comments = await ctx.db
		.query("comments")
		.withIndex("by_placeId", q => q.eq("placeId", lessonId))
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
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		await removeLesson(ctx, args.lessonId);
	},
});

export const createLesson = mutation({
	args: {
		courseId: v.id("courses"),
		name: v.string(),
		level: levelType,
		content: v.string(),
		answer: v.string(),
		template: v.object({
			head: v.string(),
			body: v.string(),
			tail: v.string(),
		}),
		status: StatusType,
		language: v.id("languages"),
	},
	async handler(ctx, args) {
		await ctx.db.insert("lessons", {
			...args,
		});
	},
});

export const updateLesson = mutation({
	args: {
		lessonId: v.id("lessons"),
		courseId: v.optional(v.id("courses")),
		name: v.optional(v.string()),
		level: v.optional(levelType),
		content: v.optional(v.string()),
		answer: v.optional(v.string()),
		template: v.optional(
			v.object({
				head: v.string(),
				body: v.string(),
				tail: v.string(),
			}),
		),
		status: v.optional(StatusType),
		language: v.optional(v.id("languages")),
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

export const getLessonInCourse = query({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const lessons = await ctx.db
			.query("lessons")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.collect();
		return lessons;
	},
});

export const getDetailLessonById = query({
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		const lesson = await getLesson(ctx, args.lessonId);
		if (!lesson) {
			throw new ConvexError("Lesson not found");
		}
		const language = await ctx.db
			.query("languages")
			.withIndex("by_id", q => q.eq("_id", lesson.language))
			.unique();
		return {
			...lesson,
			language,
		};
	},
});
