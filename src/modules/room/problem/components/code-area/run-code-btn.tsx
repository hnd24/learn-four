'use client';

import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useGetProblemTemplate} from '@/hook/data/problem';
import {useAtomValue, useSetAtom} from 'jotai';
import {Loader, Play} from 'lucide-react';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {executeCodeAtom, executingAtom} from '../../atom/result/execution';
import {useProblemId} from '../../hook/use-problem-id';

export default function RunCodeBtn() {
	const executeCode = useSetAtom(executeCodeAtom);
	const isRunning = useAtomValue(executingAtom);
	const code = useAtomValue(codeAtom);
	const language = useAtomValue(languagesAtom);
	const problemId = useProblemId();
	const {data, isPending} = useGetProblemTemplate(problemId);
	const isDisabled = isRunning || isPending;
	const onClick = async () => {
		if (!data) return;
		const {template} = data;
		const lang = language?.value || 'javascript';
		let sourceCode = code[lang];
		if (data.isPublic) {
			sourceCode = `${template[lang].head}\n${code[lang]}\n${template[lang].tail}`;
		}

		await executeCode(sourceCode);
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
