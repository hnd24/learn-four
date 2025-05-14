// context.ts
import {Theme} from "@/constants";
import {LanguageProgrammingType, RunCode, TestcaseType} from "@/types";
import {createContext} from "react";

export interface RoomContextProps {
	code: string;
	setCode: (code: string) => void;
	setRunCode: (runCode: RunCode) => void;
	runCode: RunCode;

	tempTestcases: (TestcaseType & {index: number})[];
	setTempTestcases: (testcase: (TestcaseType & {index: number})[]) => void;

	language: LanguageProgrammingType;
	setLanguage: (language: LanguageProgrammingType) => void;
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const Context = createContext<RoomContextProps | null>(null);
