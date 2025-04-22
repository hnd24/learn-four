import {CourseStateType} from "@/types";
import {createStore} from "zustand";

export type CourseActions = {
	addCoursesState: (coursesState: Partial<CourseStateType>[], loading: boolean) => void;
	changeCoursesState: (coursesState: Partial<CourseStateType>[], loading: boolean) => void;
};

export type CourseStore = {
	courses: Partial<CourseStateType>[];
	loading: boolean;
} & CourseActions;

export const createCourseStore = (initState: Partial<CourseStateType>[]) => {
	return createStore<CourseStore>()(set => ({
		courses: initState,
		loading: false,
		addCoursesState: (coursesState, loading) =>
			set(state => ({
				courses: [...state.courses, ...coursesState],
				loading: loading,
			})),
		changeCoursesState: (coursesState, loading) =>
			set(() => ({
				courses: [...coursesState],
				loading: loading,
			})),
	}));
};
