import {listLessonData} from '@/data';
import {LessonDetailType, LessonType, UserLessonType} from '@/types';

import {useState} from 'react';
import {api} from '../../../convex/_generated/api';
import {Id} from '../../../convex/_generated/dataModel';

import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';

export const useGetDetailLesson = (language: string) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: LessonType[] | undefined = listLessonData;

	return {data, isPending};
};

export const useGetLessonsByCourseId = (courseId: Id<'courses'>) => {
	return useQuery(convexQuery(api.lessons.getLessonInCourse, {courseId}));
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

export const useAddLesson = (courseId: Id<'courses'>) => {
	return useMutation({
		mutationFn: useConvexMutation(api.lessons.createLesson),
	});
};
