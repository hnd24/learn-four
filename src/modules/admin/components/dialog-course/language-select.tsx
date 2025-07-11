'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useGetLanguages} from '@/hook/data/language';
import {CourseDetailType} from '@/types';

type Props = {
	course: CourseDetailType;
	onChange: (course: CourseDetailType) => void;
};

export default function LanguageSelect({course, onChange}: Props) {
	const {data: LANGUAGES, isPending} = useGetLanguages();
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
		<div className="flex items-center gap-2">
			<h3 className="text-xl flex self-end leading-3 font-semibold mb-2">Language: </h3>
			<Select
				defaultValue={course.language.value || LANGUAGES?.[0].value}
				onValueChange={value => {
					const selectedLanguage = LANGUAGES?.find(lang => lang.value === value);
					if (!selectedLanguage) {
						console.error('Unsupported language selected.');
						return;
					}
					onChange({
						...course,
						language: selectedLanguage,
					});
				}}>
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
		</div>
	);
}
