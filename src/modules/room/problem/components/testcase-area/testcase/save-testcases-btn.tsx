'use client';

import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useUpdateProblem} from '@/hook/data/problem';
import {useAtomValue} from 'jotai';
import {Loader2, Save} from 'lucide-react';
import {toast} from 'sonner';
import {statusProblemAtom} from '../../../atom/status';
import {testCasesAtoms} from '../../../atom/testcase';
import {useProblemId} from '../../../hook/use-problem-id';

export default function SaveTestcasesBtn() {
	const problemId = useProblemId();
	const status = useAtomValue(statusProblemAtom);
	const {mutate: updateProblem, isPending} = useUpdateProblem();
	const testCases = useAtomValue(testCasesAtoms);

	if (status === 'public') {
		return null;
	}

	const onClick = () => {
		updateProblem(
			{
				problemId,
				testcase: testCases,
			},
			{
				onSuccess: () => {
					toast.success('Test cases saved successfully');
				},
				onError: error => {
					toast.error(`Failed to save test cases`);
					console.log('⚙️ Error saving test cases:', error);
				},
			},
		);
	};

	return (
		<Hint label="Save testcases">
			<Button
				size="icon"
				className=" size-8 rounded-sm  bg-cyan-700 hover:bg-cyan-800 dark:hover:bg-cyan-600 text-white"
				onClick={onClick}
				disabled={isPending}>
				{isPending ? <Loader2 className=" animate-spin" /> : <Save />}
			</Button>
		</Hint>
	);
}
