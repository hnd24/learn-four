"use client";

import {Theme} from "@/constants";
import {LanguageProgrammingEnum, ResultTestcaseType, RunCode, TestcaseType} from "@/types";
import {ReactNode, useState} from "react";
import {Context} from "./context";

export default function DashboardProvider({children}: {children: ReactNode}) {
	const [runCode, setRunCode] = useState<RunCode>(RunCode.Success);
	const [code, setCode] = useState<string>("");
	const [answerCode, setAnswerCode] = useState<string>("");
	const [tempTestcases, setTempTestcases] = useState<(TestcaseType & {index: number})[]>([]);
	const [answerTestcase, setAnswerTestcase] = useState<TestcaseType[]>([]);
	const [theme, setTheme] = useState<Theme>(Theme.Light);
	const [language, setLanguage] = useState<LanguageProgrammingEnum>(
		LanguageProgrammingEnum.JavaScript,
	);
	const [resultTestcase, setResultTestcase] = useState<ResultTestcaseType | null>(null);
	const [nameFn, setNameFn] = useState<string>("");
	return (
		<Context.Provider
			value={{
				runCode,
				setRunCode,
				code,
				setCode,
				answerCode,
				setAnswerCode,
				answerTestcase,
				setAnswerTestcase,
				tempTestcases,
				setTempTestcases,
				resultTestcase,
				setResultTestcase,
				theme,
				setTheme,
				language,
				setLanguage,
				nameFn,
				setNameFn,
			}}>
			{children}
		</Context.Provider>
	);
}
