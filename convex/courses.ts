import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";

export async function getCourse(ctx: QueryCtx | MutationCtx, courseId: Id<"courses">) {
	const course = await ctx.db.get(courseId);
	if (!course) {
		throw new ConvexError("expected course to be defined");
	}
	return course;
}

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
			.first();
		const joinedCourses = Promise.all(
			(userCourses?.joinedCourses || []).map(async ({courseId}) => {
				return await getCourse(ctx, courseId);
			}),
		);
		const completedCourses = Promise.all(
			(userCourses?.completedCourses || []).map(async courseId => {
				return await getCourse(ctx, courseId);
			}),
		);
		return {joinedCourses: await joinedCourses, completedCourses: await completedCourses};
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
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();

		const newCompletedCourses = [...(userCourses?.completedCourses || []), args.courseId];

		if (userCourses) {
			await ctx.db.patch(userCourses._id, {completedCourses: newCompletedCourses});
		} else {
			await ctx.db.insert("userCourses", {
				userId: identity.subject,
				completedCourses: newCompletedCourses,
			});
		}
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
			.withIndex("by_userId", q => q.eq("userId", identity.subject))
			.first();

		if (userCourses) {
			const lastListUserCourses = userCourses.joinedCourses || [];
			const listUserCourses = lastListUserCourses.map(course => {
				if (course.courseId === args.courseId) {
					(course.lessonCompleted || []).push(args.completedLessonId);
				}
				return course;
			});
			await ctx.db.patch(userCourses._id, {joinedCourses: listUserCourses});
		} else {
			await ctx.db.insert("userCourses", {
				userId: identity.subject,
				joinedCourses: [{courseId: args.courseId, lessonCompleted: [args.completedLessonId]}],
			});
		}
	},
});
