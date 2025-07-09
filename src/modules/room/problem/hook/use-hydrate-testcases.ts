import {useGetProblemTestcase} from '@/hook/data/problem';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {testCaseDataAtom} from '../atom/testcase';

export const useHydrateTestCases = (problemId: Id<'problems'>) => {
	const {data} = useGetProblemTestcase(problemId);
	const setTestCases = useSetAtom(testCaseDataAtom);

	useEffect(() => {
		if (!data) return;
		const {testcase = []} = data;
		setTestCases(testcase);
	}, [data, setTestCases]);
};
