'use server';

import {convex} from '@/lib/convex';
import {api} from '../../../../convex/_generated/api';
import {Id} from '../../../../convex/_generated/dataModel';

export const getLessons = async (lessonIds: string[]) => {
	return await convex.query(api.lessons.getMany, {
		lessonIds: lessonIds as Id<'lessons'>[],
	});
};

export const getProblems = async (problemIds: string[]) => {
	return await convex.query(api.problems.getMany, {
		problemIds: problemIds as Id<'problems'>[],
	});
};
