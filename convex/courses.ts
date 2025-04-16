import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {deleteLesson} from "./lessons";

export async function getCourse(ctx: QueryCtx | MutationCtx, courseId: Id<"courses">) {
	const course = await ctx.db.get(courseId);
	if (!course) {
		throw new ConvexError("expected course to be defined");
	}
	return course;
}

export const getCourseInfos = query({
	args: {},
	async handler(ctx, args) {
		const course = await ctx.db.query("courses").order("desc").collect();
		if (!course) {
			return null;
		}
		const courseInfo = await Promise.all(
			course.map(async course => {
				const courseContent = await ctx.db
					.query("courseContents")
					.withIndex("by_courseId", q => q.eq("courseId", course._id))
					.first();
				if (!courseContent) {
					return {
						...course,
					};
				}

				return {
					...course,
					...courseContent,
					lessons: courseContent.lessons.length,
				};
			}),
		);
		return courseInfo;
	},
});

export const getUserCourses = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const userCourses = await ctx.db
			.query("userCourses")
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.collect();
		if (!userCourses) {
			return null;
		}
		return await Promise.all(
			userCourses.map(async userCourse => {
				const course = await ctx.db.get(userCourse._id);
				if (!course) {
					throw new ConvexError("Course not found");
				}
				return {
					course: course,
					isCompleted: userCourse.isCompleted,
				};
			}),
		);
	},
});

export const addUserCourse = mutation({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const userCourses = await ctx.db
			.query("userCourses")
			.withIndex("by_userId_courseId", q =>
				q.eq("userId", identity.subject).eq("courseId", args.courseId),
			)
			.first();

		if (userCourses) {
			await ctx.db.patch(userCourses._id, {isCompleted: false});
		} else {
			await ctx.db.insert("userCourses", {
				userId: identity.subject,
				courseId: args.courseId,
				isCompleted: false,
			});
		}
	},
});

export const addUserCompletedCourse = mutation({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const userCourses = await ctx.db
			.query("userCourses")
			.withIndex("by_userId_courseId", q =>
				q.eq("userId", identity.subject).eq("courseId", args.courseId),
			)
			.first();
		if (!userCourses) {
			throw new ConvexError("Course not found");
		}
		await ctx.db.patch(userCourses._id, {isCompleted: true});
	},
});

export const addUserCompletedLesson = mutation({
	args: {courseId: v.id("courses"), completedLessonId: v.id("lessons")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const userCourses = await ctx.db
			.query("userCourses")
			.withIndex("by_userId_courseId", q =>
				q.eq("userId", identity.subject).eq("courseId", args.courseId),
			)
			.first();
		if (!userCourses) {
			throw new ConvexError("Course not found");
		}
		const completedLessons = userCourses.completedLesson || [];
		if (!completedLessons.includes(args.completedLessonId)) {
			completedLessons.push(args.completedLessonId);
		}
		await ctx.db.patch(userCourses._id, {completedLesson: completedLessons});
	},
});

export const createCourse = mutation({
	args: {
		name: v.string(),
		image: v.string(),
		authorId: v.string(),
		description: v.string(),
		lessons: v.array(v.id("lessons")),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const courseId = await ctx.db.insert("courses", {
			name: args.name,
			image: args.image,
			authorId: identity.subject,
		});

		await ctx.db.insert("courseContents", {
			courseId,
			description: args.description,
			lessons: args.lessons,
		});
	},
});

export const getCourseInfo = query({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const courseInfo = await ctx.db.get(args.courseId);
		if (!courseInfo) {
			throw new ConvexError("Course not found");
		}
		const courseContent = await ctx.db
			.query("courseContents")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.first();
		if (!courseContent) {
			throw new ConvexError("Course content not found");
		}
		const lessons = await Promise.all(
			courseContent.lessons!.map(async lessonId => {
				const lesson = await ctx.db.get(lessonId);
				if (!lesson) {
					throw new ConvexError("Lesson not found");
				}
				return lesson;
			}),
		);
		return {
			...courseInfo,
			...courseContent,
			lessons,
		};
	},
});

export const changeCourseInfo = mutation({
	args: {
		courseId: v.id("courses"),
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		description: v.optional(v.string()),
		lessons: v.optional(v.array(v.id("lessons"))),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const courseInfo = await ctx.db.get(args.courseId);
		if (!courseInfo) {
			throw new ConvexError("expected course to be defined");
		}
		if (args.name || args.image) {
			await ctx.db.patch(courseInfo._id, {
				name: args.name || courseInfo.name,
				image: args.image || courseInfo.image,
			});
		}
		if (args.description || args.lessons) {
			const courseContent = await ctx.db
				.query("courseContents")
				.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
				.first();
			if (!courseContent) {
				throw new ConvexError("expected course content to be defined");
			}
			await ctx.db.patch(courseContent._id, {
				description: args.description || courseContent.description,
				lessons: args.lessons || courseContent.lessons,
			});
		}
	},
});

export const deleteCourse = mutation({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		//
		const courseInfo = await ctx.db.get(args.courseId);
		if (!courseInfo) {
			throw new ConvexError("expected course to be defined");
		}
		// delete course
		await ctx.db.delete(courseInfo._id);
		// delete course content
		const courseContent = await ctx.db
			.query("courseContents")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.first();
		if (!courseContent) {
			throw new ConvexError("expected course content to be defined");
		}
		await ctx.db.delete(courseContent._id);
		// delete user course
		const userCourses = await ctx.db
			.query("userCourses")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.collect();
		if (userCourses) {
			await Promise.all(
				userCourses.map(async userCourse => {
					await ctx.db.delete(userCourse._id);
				}),
			);
		}
		// delete course comments
		const courseComments = await ctx.db
			.query("courseComments")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.collect();
		if (courseComments) {
			await Promise.all(
				courseComments.map(async courseComment => {
					await ctx.db.delete(courseComment._id);
				}),
			);
		}
		// delete lessons
		const lessons = await ctx.db
			.query("lessons")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.collect();
		if (lessons) {
			await Promise.all(
				lessons.map(async lesson => {
					await deleteLesson(ctx, lesson._id);
				}),
			);
		}
	},
});

export const changeLessonsToCourseContent = mutation({
	args: {
		courseId: v.id("courses"),
		lessons: v.array(v.id("lessons")),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const courseContent = await ctx.db
			.query("courseContents")
			.withIndex("by_courseId", q => q.eq("courseId", args.courseId))
			.first();
		if (!courseContent) {
			throw new ConvexError("expected course content to be defined");
		}
		await ctx.db.patch(courseContent._id, {lessons: args.lessons});
	},
});
