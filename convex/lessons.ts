import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";

import {removeCComment} from "./comment";
import {getCourse} from "./courses";
import {statusPlace, testcase} from "./schema";

export async function getLesson(ctx: QueryCtx | MutationCtx, lessonId: Id<"lessons">) {
	const lesson = await ctx.db.get(lessonId);
	if (!lesson) {
		throw new ConvexError("expected lesson to be defined");
	}
	return lesson;
}

export async function removeLesson(ctx: MutationCtx, lessonId: Id<"lessons">) {
	const lessonComments = await ctx.db
		.query("lessonComments")
		.withIndex("by_lessonId", q => q.eq("lessonId", lessonId))
		.collect();
	if (lessonComments && lessonComments.length > 0) {
		await Promise.all(
			lessonComments.map(async lessonComment => {
				ctx.db.delete(lessonComment._id);
				await removeCComment(ctx, lessonComment.commentId);
			}),
		);
	}
	await ctx.db.delete(lessonId);
}

export const deleteLesson = mutation({
	args: {lessonId: v.id("lessons"), courseId: v.id("courses")},
	async handler(ctx, args) {
		const course = await getCourse(ctx, args.courseId);
		await ctx.db.patch(args.courseId, {
			lessons: course.lessons?.filter(lesson => lesson !== args.lessonId),
		});
		await removeLesson(ctx, args.lessonId);
	},
});

export const getLessonInfoById = query({
	args: {lessonId: v.id("lessons")},
	async handler(ctx, args) {
		return await getLesson(ctx, args.lessonId);
	},
});

export const updateLesson = mutation({
	args: {
		courseId: v.id("courses"),
		topic: v.optional(v.string()),
		name: v.optional(v.string()),
		stars: v.optional(v.number()),
		level: v.optional(v.number()),
		content: v.optional(v.string()),
		status: v.optional(statusPlace),
		testcase: v.optional(v.array(testcase)),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.courseId, {...args});
	},
});

export const createLesson = mutation({
	args: {
		courseId: v.id("courses"),
		topic: v.string(),
		name: v.string(),
		stars: v.number(),
		level: v.number(),
		content: v.string(),
		status: statusPlace,
		testcase: v.array(testcase),
	},
	async handler(ctx, args) {
		await ctx.db.insert("lessons", {
			...args,
		});
	},
});
