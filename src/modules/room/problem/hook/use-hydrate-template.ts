import {useGetProblemTemplate} from '@/hook/data/problem';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {answerAtom} from '../atom/answer';
import {codeDataAtom} from '../atom/code';

export const useHydrateTemplate = (problemId: Id<'problems'>) => {
	const {data} = useGetProblemTemplate(problemId);
	const setAnswer = useSetAtom(answerAtom);
	const setCode = useSetAtom(codeDataAtom);

	useEffect(() => {
		if (!data) return;
		const {code, answer} = data;
		setCode(code);
		setAnswer(answer);
	}, [data, setCode]);
};
