import {createStore} from "zustand";

export type CourseState = {
	id: string;
	language: string;
	background: string;
	description: string;
	image: string;
	banner: string;
	authorImage: string;
	authorName: string;
	star: number;
	lessons: number;
};
export type CourseActions = {
	addCoursesState: (coursesState: (Partial<CourseState> & {id: string})[]) => void;
	changeCoursesState: (coursesState: Partial<CourseState> & {id: string}[]) => void;
};

export type CourseStore = {
	courses: (Partial<CourseState> & {id: string})[];
} & CourseActions;

export const createCourseStore = (initState: (Partial<CourseState> & {id: string})[]) => {
	return createStore<CourseStore>()(set => ({
		courses: initState,
		addCoursesState: coursesState =>
			set(state => ({
				courses: [...state.courses, ...coursesState],
			})),
		changeCoursesState: coursesState =>
			set(state => ({
				courses: [...coursesState],
			})),
	}));
};
