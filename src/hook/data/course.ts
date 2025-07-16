import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../../../convex/_generated/api';
import {Id} from '../../../convex/_generated/dataModel';

export const useGetCourses = () => {
	return useQuery(convexQuery(api.courses.getCourses, {}));
};

export const useGetPublicCourses = () => {
	return useQuery(convexQuery(api.courses.useGetPublicCourses, {}));
};

export const useGetDetailCourse = (id: Id<'courses'>) => {
	return useQuery(convexQuery(api.courses.getCourseById, {courseId: id}));
};

export const useAddCourse = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.courses.createCourse),
	});
};

export const useUpdateCourse = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.courses.updateCourse),
	});
};

export const useDeleteCourse = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.courses.deleteCourse),
	});
};

export const useJoinCourse = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.courses.createUserCourse),
	});
};

export const useGetUserCourse = (courseId: Id<'courses'>) => {
	return useQuery(convexQuery(api.courses.getUserCourse, {courseId}));
};
