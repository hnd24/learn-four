import {useGetLessonTemplate} from '@/hook/data/lesson';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {codeDataAtom} from '../atom/code';

export const useHydrateTemplate = (lessonId: Id<'lessons'>) => {
	const {data} = useGetLessonTemplate(lessonId);
	const setCode = useSetAtom(codeDataAtom);

	useEffect(() => {
		if (!data) return;
		const {code} = data;
		setCode(code);
	}, [data, setCode]);
};
