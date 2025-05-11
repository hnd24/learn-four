"use client";

import {LanguageProgramming, Theme} from "@/constants";
import {LessonDetailType, RunCode, TestcaseType} from "@/types";
import {ReactNode, useState} from "react";
import {Context} from "./context";

export default function DashboardProvider({children}: {children: ReactNode}) {
	const [idLesson, setIdLesson] = useState<string>("");
	const [runCode, setRunCode] = useState<RunCode>(RunCode.None);
	const [code, setCode] = useState<string>("");
	const [lessonDetail, setLessonDetail] = useState<LessonDetailType | null>(null);
	const [tempTestcases, setTempTestcases] = useState<(TestcaseType & {index: number})[]>([]);
	const [theme, setTheme] = useState<Theme>(Theme.Light);
	const [language, setLanguage] = useState<LanguageProgramming>(LanguageProgramming.JavaScript);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [selectedTestcase, setSelectedTestcase] = useState<(TestcaseType & {index: number}) | null>(
		null,
	);
	return (
		<Context.Provider
			value={{
				runCode,
				setRunCode,
				code,
				setCode,
				lessonDetail,
				setLessonDetail,
				tempTestcases,
				setTempTestcases,
				idLesson,
				setIdLesson,
				theme,
				setTheme,
				language,
				setLanguage,
				selectedIndex,
				setSelectedIndex,
				selectedTestcase,
				setSelectedTestcase,
			}}>
			{children}
		</Context.Provider>
	);
}
