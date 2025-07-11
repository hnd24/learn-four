import {lessonsCourseData, listLessonData} from '@/data';
import {
	LessonDetailType,
	lessonsCourseType,
	LessonType,
	LEVEL_LESSON,
	STATUS_LESSON,
	TestcaseType,
	UserLessonType,
} from '@/types';
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

export const useGetLessonsByCourseId = (courseId: Id<'courses'>) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: lessonsCourseType = lessonsCourseData;

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

type LessonArgs = {
	courseId: Id<'courses'>;
	name: string;
	level: LEVEL_LESSON;
	content: string;
	answer: string;
	template: {
		head: string;
		body: string;
		tail: string;
	};
	testcase: TestcaseType[];
	status: STATUS_LESSON;
};

export const useAddLesson = () => {
	const [isPending, setIsPending] = useState(false);

	const addLesson = async (courseId: Id<'courses'>): Promise<void> => {
		const defaultArgs: LessonArgs = {
			courseId,
			name: '',
			level: 'easy',
			content: '',
			answer: '',
			template: {
				head: '',
				body: '',
				tail: '',
			},
			testcase: [],
			status: 'private',
		};
		setIsPending(true);
		setTimeout(() => {
			setIsPending(false);
		}, 2000);
	};

	return {addLesson, isPending};
};
