import {listLessonData} from '@/data';
import {LessonDetailType, LessonType, UserLessonType} from '@/types';
import {useState} from 'react';
import {Id} from '../../../convex/_generated/dataModel';

export const useGetDetailLesson = (language: string) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: LessonType[] | undefined = listLessonData;

	return {data, isPending};
};

export const useGetLessonById = (id: Id<'lessons'>) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	// TODO - Replace with actual data fetching logic
	const data: LessonDetailType | undefined = undefined;

	return {data, isPending};
};

export const useGetUserLesson = () => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	// TODO - Replace with actual data fetching logic
	const data: UserLessonType | undefined = undefined;
	return {data, isPending};
};
