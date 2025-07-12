import {api} from '../../../convex/_generated/api';
import {Id} from '../../../convex/_generated/dataModel';

import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';

export const useGetDetailLesson = (lessonId: Id<'lessons'>) => {
	return useQuery(convexQuery(api.lessons.getDetailLessonById, {lessonId}));
};

export const useGetLessonsByCourseId = (courseId: Id<'courses'>) => {
	return useQuery(convexQuery(api.lessons.getLessonInCourse, {courseId}));
};

export const useGetUserLesson = (lessonId: Id<'lessons'>) => {
	return useQuery(convexQuery(api.lessons.getUserLesson, {lessonId}));
};

export const useAddLesson = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.lessons.createLesson),
	});
};
