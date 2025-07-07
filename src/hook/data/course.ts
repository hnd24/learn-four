import {CourseDetailType, CourseStateType} from '@/types';
import {useState} from 'react';
import {Id} from '../../../convex/_generated/dataModel';
import {courseData, CourseDetailData} from '../../data';

export const useGetCourses = () => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: CourseStateType[] | undefined = courseData;

	return {data, isPending};
};

export const useGetDetailCourse = (id: Id<'courses'>) => {
	const [isPending, setIsPending] = useState(false);

	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: CourseDetailType | undefined = CourseDetailData;
	return {data, isPending};
};
