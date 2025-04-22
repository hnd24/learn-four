import {CourseStateType} from "@/types";
import {courseData} from ".";

export const useGetCourses = () => {
	const data: CourseStateType[] = courseData;
	const getCourses = () => {
		return data;
	};

	const loading = false;

	return {getCourses, loading};
};
