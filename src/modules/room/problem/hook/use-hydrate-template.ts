import {useGetProblemTemplate} from '@/hook/data/problem';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {codeDataAtom} from '../atom/code';
import {templateAtom} from '../atom/template';

export const useHydrateTemplate = (problemId: Id<'problems'>) => {
	const {data} = useGetProblemTemplate(problemId);
	const setTemplate = useSetAtom(templateAtom);
	const setCode = useSetAtom(codeDataAtom);

	useEffect(() => {
		if (!data) return;
		const {code, template} = data;
		setCode(code);
		setTemplate(template);
	}, [data, setCode]);
};
