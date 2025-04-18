import {CourseState, StarType} from "@/types";
import {createStore} from "zustand";

export type CourseActions = {
	addCoursesState: (coursesState: (Partial<CourseState> & {_id: string})[]) => void;
	changeCoursesState: (coursesState: Partial<CourseState> & {_id: string}[]) => void;
};

export type CourseStore = {
	courses: (Partial<CourseState> & {_id: string})[];
} & CourseActions;

export const createCourseStore = (initState: (Partial<CourseState> & {_id: string})[]) => {
	return createStore<CourseStore>()(set => ({
		courses: initState,
		addCoursesState: coursesState =>
			set(state => ({
				courses: [...state.courses, ...coursesState],
			})),
		changeCoursesState: coursesState =>
			set(() => ({
				courses: [...coursesState],
			})),
	}));
};
