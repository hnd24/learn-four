import {LessonDetailType, ProblemStateType, UserLessonType} from "@/types";
import {useCallback, useState} from "react";
import {lessonDetailData, problemData, userLessonData} from ".";

export const useGetLessons = () => {
	const [loading, setLoading] = useState(false);

	const getLessons = useCallback(async (): Promise<ProblemStateType[]> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return problemData;
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
