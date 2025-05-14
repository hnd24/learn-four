"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {LanguageProgrammingEnum} from "@/types";
import {useRoom} from "../../provider";

export default function SelectLanguage() {
	const {language, setLanguage} = useRoom();

	return (
		<Select value={language} onValueChange={value => setLanguage(value as LanguageProgrammingEnum)}>
			<SelectTrigger className="min-w-52 w-fit">
				<SelectValue placeholder="Select language" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(LanguageProgrammingEnum).map(lang => (
					<SelectItem key={lang} value={lang}>
						{lang}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
