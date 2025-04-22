import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";

import {removeCComment} from "./comment";
import {removeLesson} from "./lessons";
import {statusPlace} from "./schema";

export async function getCourse(ctx: QueryCtx, courseId: Id<"courses">) {
	const course = await ctx.db.get(courseId);
	if (!course) {
		throw new ConvexError("expected course to be defined");
	}
	return course;
}

export async function removeCourse(ctx: MutationCtx, courseId: Id<"courses">) {
	const course = await ctx.db.get(courseId);
	if (course?.lessons && course.lessons.length > 0) {
		await Promise.all(
			course.lessons.map(async lessonId => {
				await removeLesson(ctx, lessonId);
			}),
		);
	}
	const courseComments = await ctx.db
		.query("courseComments")
		.withIndex("by_courseId", q => q.eq("courseId", courseId))
		.collect();

	if (courseComments && courseComments.length > 0) {
		await Promise.all(
			courseComments.map(async courseComment => {
				ctx.db.delete(courseComment._id);
				await removeCComment(ctx, courseComment.commentId);
			}),
		);
	}
	await ctx.db.delete(courseId);
}

export const deleteCourse = mutation({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		await removeCourse(ctx, args.courseId);
	},
});

export const getCourseInfos = query({
	args: {},
	async handler(ctx, args) {
		const courses = await ctx.db.query("courses").order("desc").collect();
		if (!courses) {
			return [];
		}
		return courses.map(course => {
			return {
				_id: course._id,
				background: course.background,
				language: course.language,
				description: course.description,
				logoLanguage: course.logoLanguage,
				banner: course.banner,
				authorImage: course.authorImage,
				authorId: course.authorId,
				authorName: course.authorName,
				star: course.star,
				learner: course.learner,
				status: course.status,
				lessons: course.lessons?.length || 0,
			};
		});
	},
});

export const getCoursesOfUser = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("User not found");
		}
		const userCourses = await ctx.db
			.query("userCourses")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.collect();
		if (userCourses.length === 0) {
			return [];
		}
		return Promise.all(
			userCourses.map(async userCourse => {
				const course = await ctx.db.get(userCourse.courseId);

				if (course) {
					return {
						_id: course._id,
						background: course.background,
						language: course.language,
						description: course.description,
						logoLanguage: course.logoLanguage,
						banner: course.banner,
						authorImage: course.authorImage,
						authorId: course.authorId,
						authorName: course.authorName,
						star: course.star,
						learner: course.learner,
						status: course.status,
						isCompleted: userCourse.isCompleted,
					};
				}
			}),
		);
	},
});

export const getCourseContentById = query({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const course = await ctx.db.get(args.courseId);
		if (!course) {
			throw new ConvexError("Course not found");
		}
		if (course.lessons && course.lessons.length > 0) {
			const lessonInfos = await Promise.all(
				await Promise.all(
					course.lessons?.map(async lessonId => {
						const lesson = await ctx.db.get(lessonId);
						if (lesson) {
							return {
								_id: lesson._id,
								topic: lesson.topic,
								stars: lesson.stars,
								level: lesson.level,
							};
						}
					}),
				),
			);
			return {
				_id: course._id,
				content: course.content,
				lessons: lessonInfos,
			};
		}
		return {
			_id: course._id,
			content: course.content,
			lessons: 0,
		};
	},
});

export const updateCourse = mutation({
	args: {
		courseId: v.id("courses"),
		language: v.optional(v.string()),
		logoLanguage: v.optional(v.string()),
		description: v.optional(v.string()),
		background: v.optional(v.string()),
		banner: v.optional(v.string()),
		star: v.optional(v.number()),
		learner: v.optional(v.number()),
		authorId: v.optional(v.string()),
		authorName: v.optional(v.string()),
		authorImage: v.optional(v.string()),
		content: v.optional(v.string()),
		status: v.optional(statusPlace),
		lessons: v.optional(v.array(v.id("lessons"))),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.courseId, {...args});
	},
});

export const createCourse = mutation({
	args: {
		language: v.string(),
		logoLanguage: v.string(),
		description: v.string(),
		background: v.string(),
		banner: v.string(),
		star: v.number(),
		authorId: v.string(),
		authorName: v.string(),
		authorImage: v.string(),
		content: v.string(),
		status: statusPlace,
		lessons: v.optional(v.array(v.id("lessons"))),
	},
	async handler(ctx, args) {
		await ctx.db.insert("courses", {
			...args,
			learner: 0,
		});
	},
});
