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
import {languagesAtom} from '../../atom/language';
import {statusProblemAtom} from '../../atom/status';
import {templateAtom} from '../../atom/template';

export default function LanguageSelector() {
	const {data: LANGUAGES, isPending} = useGetLanguages();
	const [languages, setLanguages] = useState<LanguageType[]>([]);
	const status = useAtomValue(statusProblemAtom);
	const template = useAtomValue(templateAtom);
	const setLanguage = useSetAtom(languagesAtom);

	// Filter languages based on the code object
	useEffect(() => {
		if (!LANGUAGES || LANGUAGES.length === 0) return;
		if (status === 'private') {
			setLanguages(LANGUAGES ?? []);
			setLanguage(languages?.[0]);
			return;
		}
		const filterLanguages = Object.keys(template).map(l => {
			if (template[l]) {
				return LANGUAGES.find(lang => lang.value === l);
			}
		});
		setLanguages(filterLanguages.filter(Boolean) as LanguageType[]);
		setLanguage(languages?.[0]);
	}, [template, LANGUAGES, status]);

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
		<Select defaultValue={languages[0]?.value} onValueChange={onChange}>
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
	);
}
