import {useGetProblemTestcase} from '@/hook/data/problem';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {testCaseDataAtom} from '../atom/testcase';
import {useProblemId} from './use-problem-id';

export const useHydrateTestCases = () => {
	const problemId: Id<'problems'> = useProblemId();
	const {data} = useGetProblemTestcase(problemId);
	const setTestCases = useSetAtom(testCaseDataAtom);

	useEffect(() => {
		if (!data) return;
		const {testcase = []} = data;
		setTestCases(testcase);
	}, [data, setTestCases]);
};
