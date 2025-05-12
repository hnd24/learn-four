import {CourseStateType} from "@/types";
import {useCallback, useState} from "react";
import {courseData} from ".";

export const useGetCourses = () => {
	const [loading, setLoading] = useState(false);

	const getCourses = useCallback(async (): Promise<CourseStateType[]> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return courseData;
	}, []);

	return {getCourses, loading};
};
