import {courseData} from ".";

export const useGetCourses = () => {
	const data = courseData;
	const getCourses = () => {
		return data;
	};

	const loading = false;

	return {getCourses, loading};
};
