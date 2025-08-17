'use client';

import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useGetLessonTemplate, useUpdateUserLesson} from '@/hook/data/lesson';
import {getOverallStatus} from '@/modules/room/lib/utils';
import {StatusResult} from '@/types';
import {useAtomValue, useSetAtom} from 'jotai';
import {Loader, Play} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {codeAtom} from '../../atom/code';
import {resultsAtom} from '../../atom/result';
import {executeCodeAtom, executingAtom} from '../../atom/result/execution';
import {statusLessonAtom} from '../../atom/status';
import {useLessonId} from '../../hook/use-lesson-id';

export default function RunCodeBtn() {
	const executeCode = useSetAtom(executeCodeAtom);
	const isRunning = useAtomValue(executingAtom);
	const code = useAtomValue(codeAtom);
	const lessonId = useLessonId();
	const {data, isPending} = useGetLessonTemplate(lessonId);
	const {mutate: addUserLesson, isPending: pendingAdd} = useUpdateUserLesson();
	const isDisabled = isRunning || isPending || pendingAdd;
	const results = useAtomValue(resultsAtom);
	const statusResult = getOverallStatus(results);
	const status = useAtomValue(statusLessonAtom);
	const [onClick, setOnClick] = useState<boolean>(false);

	useEffect(() => {
		if (onClick) {
			if (statusResult === StatusResult.Accepted && status === 'public') {
				addUserLesson(
					{
						lessonId,
						state: 'completed',
						code,
					},
					{
						onSuccess: () => {
							toast.success(`Your code has been saved!`);
						},
						onError: error => {
							console.error('Error updating user problem:', error);
						},
					},
				);
			}
			setOnClick(false);
		}
	}, [onClick]);

	const handleClick = async () => {
		if (!data) return;
		const {template} = data;
		let sourceCode = code;
		if (data.isPublic) {
			sourceCode = `${template.head}\n${code}\n${template.tail}`;
		}

		await executeCode(sourceCode);
		setOnClick(true);
	};

	return (
		<Hint label="Run">
			<Button
				size="icon"
				variant="ghost"
				className="dark:hover:bg-input/50 size-8 rounded-sm"
				onClick={handleClick}
				disabled={isDisabled}>
				{isDisabled ? <Loader /> : <Play />}
			</Button>
		</Hint>
	);
}
