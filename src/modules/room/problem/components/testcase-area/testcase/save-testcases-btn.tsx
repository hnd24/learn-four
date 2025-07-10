'use client';

import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useGetProblemById, useUpdateProblem} from '@/hook/data/problem';
import {useAtomValue} from 'jotai';
import {Loader2, Save} from 'lucide-react';
import {testCasesAtoms} from '../../../atom/testcase';
import {useProblemId} from '../../../hook/use-problem-id';

export default function SaveTestcasesBtn() {
	const problemId = useProblemId();
	const {data: problem, isPending: loading} = useGetProblemById(problemId);
	const {updateProblem, isPending} = useUpdateProblem();
	const testCases = useAtomValue(testCasesAtoms);

	if (problem.status === 'public') {
		return null;
	}

	const onClick = () => {
		// IMPORTANT
		updateProblem(problemId, {
			testcase: testCases,
		});
	};

	return (
		<Hint label="Save testcases">
			<Button
				size="icon"
				className=" size-8 rounded-sm"
				onClick={onClick}
				disabled={isPending || loading}>
				{isPending ? <Loader2 className=" animate-spin" /> : <Save />}
			</Button>
		</Hint>
	);
}
