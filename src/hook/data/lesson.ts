import {listLessonData} from '@/data';
import {LessonDetailType, LessonType, UserLessonType} from '@/types';
import {useCallback, useState} from 'react';

export const useGetLessons = () => {
	const [loading, setLoading] = useState(false);

	const getLessons = useCallback(async (language: string): Promise<LessonType[] | undefined> => {
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

	const getLessonById = useCallback(async (id: string): Promise<LessonDetailType | undefined> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return undefined;
	}, []);

	return {getLessonById, loading};
};

export const useGetUserLesson = () => {
	const [loading, setLoading] = useState(false);

	const getUserLesson = useCallback(
		async (idLesson: string): Promise<UserLessonType | undefined> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
			return undefined;
		},
		[],
	);

	return {getUserLesson, loading};
};
