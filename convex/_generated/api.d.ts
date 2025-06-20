/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as clerk from "../clerk.js";
import type * as comment from "../comment.js";
import type * as courses from "../courses.js";
import type * as http from "../http.js";
import type * as languages from "../languages.js";
import type * as lessons from "../lessons.js";
import type * as problems from "../problems.js";
import type * as topic from "../topic.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  clerk: typeof clerk;
  comment: typeof comment;
  courses: typeof courses;
  http: typeof http;
  languages: typeof languages;
  lessons: typeof lessons;
  problems: typeof problems;
  topic: typeof topic;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
