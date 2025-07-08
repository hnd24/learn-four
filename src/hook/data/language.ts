import {LanguageData} from '@/data';
import {LanguageType} from '@/types';
import {useState} from 'react';

export const useGetLanguages = () => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: LanguageType[] | undefined = LanguageData;
	return {data, isPending};
};
