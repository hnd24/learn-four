import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		image: v.optional(v.string()),
	}).index("by_userId", ["userId"]),
});
