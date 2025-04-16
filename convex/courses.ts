import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {deleteLesson} from "./lessons";
import {star} from "./schema";

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
		const courses = await ctx.db.query("courses").order("desc").collect();
		if (!courses) {
			return null;
		}
		const courseInfos = await Promise.all(
			courses.map(async course => {
				const author = await ctx.db.get(course.authorId as Id<"users">);
				if (!author) {
					return {
						id: course._id,
						language: course.language,
						logoLanguage: course.logoLanguage,
						description: course.description,
						banner: course.banner,
						star: course.star,
						lessons: course.lessons.length,
						background: course.background,
						authorName: "Anonymous",
						authorImage: "https://github.com/shadcn.png",
					};
				}
				return {
					_id: course._id,
					language: course.language,
					logoLanguage: course.logoLanguage,
					description: course.description,
					banner: course.banner,
					star: course.star,
					lessons: course.lessons.length,
					background: course.background,
					authorName: author?.name,
					authorImage: author?.image,
				};
			}),
		);
		return courseInfos;
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
		language: v.string(),
		logoLanguage: v.string(),
		description: v.string(),
		background: v.string(),
		banner: v.string(),
		star: v.optional(star),
		content: v.optional(v.string()),
		lessons: v.optional(v.array(v.id("lessons"))),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const courseId = await ctx.db.insert("courses", {
			...args,
			content: args.content || "",
			lessons: args.lessons || [],
			authorId: identity.subject,
		});
		return courseId;
	},
});

export const getCourseInfo = query({
	args: {courseId: v.id("courses")},
	async handler(ctx, args) {
		const course = await ctx.db.get(args.courseId);
		if (!course) {
			return null;
		}

		const lessons = await Promise.all(
			course.lessons!.map(async lessonId => {
				const lesson = await ctx.db.get(lessonId);
				if (!lesson) {
					return null;
				}
				return lesson;
			}),
		);
		const author = await ctx.db.get(course.authorId as Id<"users">);
		if (!author) {
			return {
				...course,
				authorName: "Anonymous",
				authorImage: "https://github.com/shadcn.png",
				lessons,
			};
		}

		return {
			...course,
			authorName: author.name,
			authorImage: author.image,
			lessons,
		};
	},
});

export const changeCourseInfo = mutation({
	args: {
		courseId: v.id("courses"),
		language: v.optional(v.string()),
		logoLanguage: v.optional(v.string()),
		description: v.optional(v.string()),
		background: v.optional(v.string()),
		banner: v.optional(v.string()),
		star: v.optional(star),
		content: v.optional(v.string()),
		lessons: v.optional(v.array(v.id("lessons"))),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}
		const course = await ctx.db.get(args.courseId);
		if (!course) {
			return null;
		}
		await ctx.db.patch(course._id, {
			...args,
		});
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
		await ctx.db.patch(args.courseId, {lessons: args.lessons});
	},
});
