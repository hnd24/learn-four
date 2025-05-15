// context.ts
import {Theme} from "@/constants";
import {LanguageProgrammingEnum, ResultTestcaseType, RunCode, TestcaseType} from "@/types";
import {createContext} from "react";

export interface RoomContextProps {
	code: string;
	setCode: (code: string) => void;
	runCode: RunCode;
	setRunCode: (runCode: RunCode) => void;
	answerCode: string;
	setAnswerCode: (answer: string) => void;
	answerTestcase: TestcaseType[];
	setAnswerTestcase: (testcase: TestcaseType[]) => void;
	tempTestcases: (TestcaseType & {index: number})[];
	setTempTestcases: (testcase: (TestcaseType & {index: number})[]) => void;
	language: LanguageProgrammingEnum;
	setLanguage: (language: LanguageProgrammingEnum) => void;
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resultTestcase: ResultTestcaseType | null;
	setResultTestcase: (result: ResultTestcaseType) => void;
	nameFn: string;
	setNameFn: (name: string) => void;
	idLesson: string;
	setIdLesson: (id: string) => void;
}

export const Context = createContext<RoomContextProps | null>(null);
