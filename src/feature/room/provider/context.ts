// context.ts
import {LanguageProgramming, Theme} from "@/constants";
import {LessonDetailType, RunCode, TestcaseType} from "@/types";
import {createContext} from "react";

export interface RoomContextProps {
	code: string;
	setCode: (code: string) => void;
	setRunCode: (runCode: RunCode) => void;
	runCode: RunCode;
	lessonDetail: LessonDetailType | null;
	setLessonDetail: (lessonDetail: LessonDetailType | null) => void;
	tempTestcases: (TestcaseType & {index: number})[];
	setTempTestcases: (testcase: (TestcaseType & {index: number})[]) => void;
	idLesson: string;
	setIdLesson: (idLesson: string) => void;
	language: LanguageProgramming;
	setLanguage: (language: LanguageProgramming) => void;
	theme: Theme;
	setTheme: (theme: Theme) => void;
	selectedIndex: number;
	setSelectedIndex: (selectedIndex: number) => void;
	selectedTestcase: (TestcaseType & {index: number}) | null;
	setSelectedTestcase: (selectedTestcase: (TestcaseType & {index: number}) | null) => void;
}

export const Context = createContext<RoomContextProps | null>(null);
