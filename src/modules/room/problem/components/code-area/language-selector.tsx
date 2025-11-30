'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useGetLanguages} from '@/hook/data/language';
import {LanguageType} from '@/types';
import {useAtomValue, useSetAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {answerAtom} from '../../atom/answer';
import {languagesAtom} from '../../atom/language';
import {statusProblemAtom} from '../../atom/status';

export default function LanguageSelector() {
	const {data: LANGUAGES, isPending} = useGetLanguages();
	const [languages, setLanguages] = useState<LanguageType[]>([]);
	const status = useAtomValue(statusProblemAtom);
	const answer = useAtomValue(answerAtom);
	const setLanguage = useSetAtom(languagesAtom);
	const language = useAtomValue(languagesAtom);

	useEffect(() => {
		setLanguages(LANGUAGES ?? []);
		if (status === 'private') {
			setLanguages(LANGUAGES ?? []);
			setLanguage(LANGUAGES?.[0]);
			return;
		} else {
			if (answer) {
				const filterLanguages = Object.keys(answer).map(l => {
					if (answer[l]) {
						return LANGUAGES?.find(lang => lang.value === l);
					}
				});
				setLanguages(filterLanguages.filter(Boolean) as LanguageType[]);
				setLanguage(filterLanguages?.[0]);
			}
		}
	}, [answer, LANGUAGES, status]);

	const onChange = (value: string) => {
		const selectedLanguage = LANGUAGES?.find(lang => lang.value === value);

		if (!selectedLanguage) {
			toast.error('Unsupported language selected.');
			return;
		}

		setLanguage(selectedLanguage);
	};

	if (isPending) {
		return (
			<Select disabled>
				<SelectTrigger className="!h-8 rounded-sm border-none  dark:bg-transparent">
					<SelectValue placeholder="Loading..." />
				</SelectTrigger>
			</Select>
		);
	}

	return (
		<>
			{languages[0]?.value && (
				<Select
					key={language?._id}
					defaultValue={language?.value || languages[0]?.value}
					onValueChange={onChange}>
					<SelectTrigger className="!h-8 rounded-sm border-none  dark:bg-transparent">
						<SelectValue placeholder="Language" />
					</SelectTrigger>
					<SelectContent>
						{languages.map(lang => (
							<SelectItem key={lang.value} value={lang.value}>
								{lang.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</>
	);
}
