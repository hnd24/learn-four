import {LessonDetailType, ProblemStateType} from "@/types";
import {useCallback, useState} from "react";
import {lessonDetailData, problemData} from ".";

export const useGetLessons = () => {
	const [loading, setLoading] = useState(false);

	const getLessons = useCallback(async (): Promise<ProblemStateType[]> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
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
		}, 1000);
		return lessonDetailData;
	}, []);

	return {getLessonById, loading};
};
