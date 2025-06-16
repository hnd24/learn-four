"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {LanguageProgrammingEnum} from "@/types";
import {memo} from "react";
import {useRoom} from "../../provider";

function SelectLanguage() {
	const {language, setLanguage} = useRoom();
	console.log("🚀 ~ SelectLanguage ~ language:", language);

	return (
		<Select value={language} onValueChange={value => setLanguage(value as LanguageProgrammingEnum)}>
			<SelectTrigger className="min-w-32 w-fit border-2 border-gray-300 hover:bg-zinc-300 cursor-pointer font-semibold">
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

export default memo(SelectLanguage);
