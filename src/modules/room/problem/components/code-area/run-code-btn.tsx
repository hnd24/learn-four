'use client';

import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useGetProblemTemplate, useUpdateUserProblem} from '@/hook/data/problem';
import {getOverallStatus} from '@/modules/room/lib/utils';
import {StatusResult} from '@/types';
import {useAtomValue, useSetAtom} from 'jotai';
import {Loader, Play} from 'lucide-react';
import {toast} from 'sonner';
import {codeAtom, codeFromDB} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {resultsAtom} from '../../atom/result';
import {executeCodeAtom, executingAtom} from '../../atom/result/execution';
import {statusProblemAtom} from '../../atom/status';
import {useProblemId} from '../../hook/use-problem-id';

export default function RunCodeBtn() {
	const executeCode = useSetAtom(executeCodeAtom);
	const isRunning = useAtomValue(executingAtom);
	const code = useAtomValue(codeAtom);
	const codeDB = useAtomValue(codeFromDB);
	const language = useAtomValue(languagesAtom);
	const problemId = useProblemId();
	const {data, isPending} = useGetProblemTemplate(problemId);
	const {mutate: addUserProblem, isPending: pendingAdd} = useUpdateUserProblem();
	const isDisabled = isRunning || isPending || pendingAdd;
	const results = useAtomValue(resultsAtom);
	const statusResult = getOverallStatus(results);
	const status = useAtomValue(statusProblemAtom);

	const onClick = async () => {
		if (!data) return;
		const {template} = data;
		const lang = language?.value || 'javascript';
		let sourceCode = code[lang];
		if (data.isPublic) {
			sourceCode = `${template[lang].head}\n${code[lang]}\n${template[lang].tail}`;
		}
		await executeCode(sourceCode);

		if (statusResult === StatusResult.Accepted && status === 'public') {
			addUserProblem(
				{
					problemId,
					state: 'completed',
					code: {
						...codeDB,
						[lang]: code[lang],
					},
				},
				{
					onSuccess: () => {
						toast.success(`Your ${language?.name} code has been saved!`);
					},
					onError: error => {
						toast.error(`Failed to save your code`);
						console.error('Error updating user problem:', error);
					},
				},
			);
		}
	};
	return (
		<Hint label="Run">
			<Button
				size="icon"
				variant="ghost"
				className="dark:hover:bg-input/50 size-8 rounded-sm"
				onClick={onClick}
				disabled={isDisabled}>
				{isDisabled ? <Loader /> : <Play />}
			</Button>
		</Hint>
	);
}
