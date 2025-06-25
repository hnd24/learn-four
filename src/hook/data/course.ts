import {CourseDetailType, CourseStateType} from '@/types';
import {useCallback, useState} from 'react';
import {courseData, CourseDetailData} from '../../data';

export const useGetCourses = () => {
	const [loading, setLoading] = useState(false);

	const getCourses = useCallback(async (): Promise<CourseStateType[] | undefined> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return courseData;
	}, []);

	return {getCourses, loading};
};

export const useGetDetailCourse = () => {
	const [loading, setLoading] = useState(false);

	const getDetailCourse = useCallback(
		async (idCourse: string): Promise<CourseDetailType | undefined> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
			return CourseDetailData;
		},
		[],
	);

	return {getDetailCourse, loading};
};
