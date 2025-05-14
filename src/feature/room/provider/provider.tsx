"use client";

import {Theme} from "@/constants";
import {LanguageProgrammingType, RunCode, TestcaseType} from "@/types";
import {ReactNode, useState} from "react";
import {Context} from "./context";

export default function DashboardProvider({children}: {children: ReactNode}) {
	const [runCode, setRunCode] = useState<RunCode>(RunCode.Success);
	const [code, setCode] = useState<string>("");
	const [tempTestcases, setTempTestcases] = useState<(TestcaseType & {index: number})[]>([]);
	const [theme, setTheme] = useState<Theme>(Theme.Light);
	const [language, setLanguage] = useState<LanguageProgrammingType>(
		LanguageProgrammingType.JavaScript,
	);

	return (
		<Context.Provider
			value={{
				runCode,
				setRunCode,
				code,
				setCode,

				tempTestcases,
				setTempTestcases,

				theme,
				setTheme,
				language,
				setLanguage,
			}}>
			{children}
		</Context.Provider>
	);
}
