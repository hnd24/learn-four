"use client";

import {CourseStore, createCourseStore} from "@/store/course-store";
import {type ReactNode, createContext, useContext, useRef} from "react";
import {useStore} from "zustand";

export type CourseStoreApi = ReturnType<typeof createCourseStore>;
export const CourseStoreContext = createContext<CourseStoreApi | undefined>(undefined);

export type Props = {
	children: ReactNode;
};

export const CourseStoreProvider = ({children}: Props) => {
	const storeRef = useRef<CourseStoreApi | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createCourseStore([]);
	}

	return (
		<CourseStoreContext.Provider value={storeRef.current}>{children}</CourseStoreContext.Provider>
	);
};

export const useCourseStore = <T,>(selector: (store: CourseStore) => T): T => {
	const courseStore = useContext(CourseStoreContext);

	if (!courseStore) {
		throw new Error(`useCourseStore must be used within CourseStoreProvider`);
	}

	return useStore(courseStore, selector);
};
