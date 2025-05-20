import {LessonDetailType, LessonType, UserLessonType} from "@/types";
import {useCallback, useState} from "react";
import {lessonDetailData, listLessonData, userLessonData} from "../../data";

export const useGetLessons = () => {
	const [loading, setLoading] = useState(false);

	const getLessons = useCallback(async (language: string): Promise<LessonType[]> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return listLessonData;
	}, []);

	return {getLessons, loading};
};

export const useGetLessonById = () => {
	const [loading, setLoading] = useState(false);

	const getLessonById = useCallback(async (id: string): Promise<LessonDetailType> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return lessonDetailData;
	}, []);

	return {getLessonById, loading};
};

export const useGetUserLesson = () => {
	const [loading, setLoading] = useState(false);

	const getUserLesson = useCallback(async (idLesson: string): Promise<UserLessonType> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return userLessonData;
	}, []);

	return {getUserLesson, loading};
};

export const useUpdateCodeUserLesson = () => {
	const [loading, setLoading] = useState(false);

	const updateCode = useCallback(async (idLesson: string, code: string): Promise<void> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return {updateCode, loading};
};
