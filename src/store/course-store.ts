import {CourseStateType} from "@/types";
import {createStore} from "zustand";

export type CourseActions = {
	changeCoursesState: (courses?: Partial<CourseStateType>[]) => void;
	changeLoadingState: (loading: boolean) => void;
};

export type CourseStore = {
	courses: Partial<CourseStateType>[];
	loading: boolean;
} & CourseActions;

export const createCourseStore = (initState: Partial<CourseStateType>[]) => {
	return createStore<CourseStore>()(set => ({
		courses: initState,
		loading: false,

		changeCoursesState: courses =>
			set(state => ({
				courses: courses ?? state.courses,
			})),
		changeLoadingState: loading =>
			set(() => ({
				loading: loading,
			})),
	}));
};
