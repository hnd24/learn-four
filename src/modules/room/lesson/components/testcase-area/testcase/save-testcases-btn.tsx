'use client';

import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useAtomValue} from 'jotai';
import {Loader2, Save} from 'lucide-react';
import {toast} from 'sonner';

import {useUpdateLesson} from '@/hook/data/lesson';
import {statusLessonAtom} from '../../../atom/status';
import {rawTestCaseAtoms, testCasesAtoms} from '../../../atom/testcase';
import {useLessonId} from '../../../hook/use-lesson-id';

export default function SaveTestcasesBtn() {
	const lessonId = useLessonId();
	const status = useAtomValue(statusLessonAtom);
	const {mutate: updateLesson, isPending} = useUpdateLesson();
	const publicTestCases = useAtomValue(testCasesAtoms);
	const rawTestCases = useAtomValue(rawTestCaseAtoms);
	const testCases = [...publicTestCases, ...rawTestCases].filter(
		(tc, idx, arr) => arr.findIndex(t => t.id === tc.id) === idx,
	);
	if (status === 'public') {
		return null;
	}

	const onClick = () => {
		updateLesson(
			{
				lessonId,
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
				className=" size-8 rounded-sm bg-cyan-700 hover:bg-cyan-800 dark:hover:bg-cyan-600 text-white"
				onClick={onClick}
				disabled={isPending}>
				{isPending ? <Loader2 className=" animate-spin" /> : <Save />}
			</Button>
		</Hint>
	);
}
