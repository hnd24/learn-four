import {useGetLessonTestcase} from '@/hook/data/lesson';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {testCaseDataAtom} from '../atom/testcase';

export const useHydrateTestCases = (lessonId: Id<'lessons'>) => {
	const {data} = useGetLessonTestcase(lessonId);
	const setTestCases = useSetAtom(testCaseDataAtom);

	useEffect(() => {
		if (!data) return;
		const {testcase = []} = data;
		setTestCases(testcase);
	}, [data, setTestCases]);
};
