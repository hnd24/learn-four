import {ConvexError} from "convex/values";
import {Id} from "./_generated/dataModel";
import {MutationCtx, QueryCtx} from "./_generated/server";

export async function getLesson(ctx: QueryCtx | MutationCtx, lessonId: Id<"lessons">) {
	const lesson = await ctx.db.get(lessonId);
	if (!lesson) {
		throw new ConvexError("expected lesson to be defined");
	}
	return lesson;
}
