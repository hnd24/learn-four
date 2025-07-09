import {useGetProblemTemplate} from '@/hook/data/problem';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {codeDataAtom} from '../atom/code';

export const useHydrateTemplate = (problemId: Id<'problems'>) => {
	const {data} = useGetProblemTemplate(problemId);
	const setCode = useSetAtom(codeDataAtom);

	useEffect(() => {
		if (!data) return;
		const {code} = data;
		setCode(code);
	}, [data, setCode]);
};
