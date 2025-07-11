'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useGetLanguages} from '@/hook/data/language';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {languagesAtom} from '../../atom/language';

export default function LanguageSelector() {
	const {data: LANGUAGES, isPending} = useGetLanguages();
	const [language, setLanguage] = useAtom(languagesAtom);

	// IMPORTANT:set up for user mode
	// const code = useAtomValue(codeFromDB);
	// Filter languages based on the code object
	// const [languages, setLanguages] = useState<LanguageType[]>([]);
	// useEffect(() => {
	// 	if (!LANGUAGES || LANGUAGES.length === 0) return;
	// 	const languages = Object.keys(code).map(l => {
	// 		if (code[l].trim()) {
	// 			return LANGUAGES.find(lang => lang.value === l);
	// 		}
	// 	});
	// 	setLanguages(languages.filter(Boolean) as LanguageType[]);
	// }, [code, LANGUAGES]);

	useEffect(() => {
		if (LANGUAGES?.length === 0) return;
		setLanguage(LANGUAGES?.[0]);
	}, [LANGUAGES]);

	const onChange = (value: string) => {
		const selectedLanguage = LANGUAGES?.find(lang => lang.value === value);

		if (!selectedLanguage) {
			toast.error('Unsupported language selected.');
			return;
		}

		setLanguage(selectedLanguage);
	};

	// if (languages.length === 0 || isPending) {
	if (isPending || !LANGUAGES || LANGUAGES.length === 0) {
		return (
			<Select disabled>
				<SelectTrigger className="!h-8 rounded-sm border-none  dark:bg-transparent">
					<SelectValue placeholder="Loading..." />
				</SelectTrigger>
			</Select>
		);
	}

	return (
		<Select defaultValue={language?.value || LANGUAGES?.[0].value} onValueChange={onChange}>
			<SelectTrigger className="!h-8 rounded-sm border-none  dark:bg-transparent">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{LANGUAGES.map(lang => (
					<SelectItem key={lang.value} value={lang.value}>
						{lang.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
