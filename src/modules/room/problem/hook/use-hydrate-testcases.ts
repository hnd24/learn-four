import {useGetProblemTestcase} from '@/hook/data/problem';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {testCaseDataAtom} from '../atom/testcase';

type Props = {
	problemId: Id<'problems'>;
};

export const useHydrateTestCases = ({problemId}: Props) => {
	const {data} = useGetProblemTestcase(problemId);
	const setTestCases = useSetAtom(testCaseDataAtom);

	useEffect(() => {
		if (!data) return;
		const {testcase = []} = data;
		setTestCases(testcase);
	}, [data, setTestCases]);
};
