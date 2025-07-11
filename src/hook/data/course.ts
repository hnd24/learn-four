import {CourseDetailType, CourseStateType, STATUS_COURSE} from '@/types';
import {useCallback, useState} from 'react';
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

type UpdateCourseArgs = {
	status: STATUS_COURSE;
	name: string;
	description: string;
	banner: string;
	logo: string;
};

export const useUpdateCourse = () => {
	const [isPending, setIsPending] = useState(false);

	const updateCourse = useCallback(
		async (id: Id<'courses'>, args: Partial<UpdateCourseArgs>): Promise<void> => {
			setIsPending(true);
			setTimeout(() => {
				setIsPending(false);
			}, 2000);
		},
		[],
	);

	return {updateCourse, isPending};
};
