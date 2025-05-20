// src/stores/room-store.ts
import {Theme} from "@/constants";
import {LanguageProgrammingEnum, ResultTestcaseType, RunCode, TestcaseType} from "@/types";
import {createStore} from "zustand/vanilla";

export type RoomState = {
	code: string;
	answerCode: string;
	answerTestcase: TestcaseType[];
	tempTestcases: (TestcaseType & {index: number})[];
	language: LanguageProgrammingEnum;
	theme: Theme;
	resultTestcase: ResultTestcaseType | null;
	nameFn: string;
	idLesson: string;
	loadingUserLesson: boolean;
	loadingLesson: boolean;
	runCode: RunCode;
};

export type RoomActions = {
	setCode: (code: string) => void;
	setAnswerCode: (answerCode: string) => void;
	setAnswerTestcase: (answerTestcase: TestcaseType[]) => void;
	setTempTestcases: (tempTestcases: (TestcaseType & {index: number})[]) => void;
	setLanguage: (language: LanguageProgrammingEnum) => void;
	setTheme: (theme: Theme) => void;
	setResultTestcase: (resultTestcase: ResultTestcaseType) => void;
	setNameFn: (nameFn: string) => void;
	setIdLesson: (idLesson: string) => void;
	setLoadingUserLesson: (loading: boolean) => void;
	setLoadingLesson: (loading: boolean) => void;
	setRunCode: (runCode: RunCode) => void;
};

// Cấu hình mặc định
export const defaultRoomState: RoomState = {
	code: "",
	answerCode: "",
	answerTestcase: [],
	tempTestcases: [],
	language: LanguageProgrammingEnum.JavaScript,
	theme: Theme.Light,
	resultTestcase: null,
	nameFn: "",
	idLesson: "",
	loadingUserLesson: false,
	loadingLesson: false,
	runCode: RunCode.None,
};

export type RoomStore = RoomState & RoomActions;

// Tạo store
export const createRoomStore = (initState: RoomState = defaultRoomState) => {
	return createStore<RoomState & RoomActions>()(set => ({
		...initState,
		setCode: code => set({code}),
		setAnswerCode: answerCode => set({answerCode}),
		setAnswerTestcase: answerTestcase => set({answerTestcase}),
		setTempTestcases: tempTestcases => set({tempTestcases}),
		setLanguage: language => set({language}),
		setTheme: theme => set({theme}),
		setResultTestcase: resultTestcase => set({resultTestcase}),
		setNameFn: nameFn => set({nameFn}),
		setIdLesson: idLesson => set({idLesson}),
		setLoadingUserLesson: loadingUserLesson => set({loadingUserLesson}),
		setLoadingLesson: loadingLesson => set({loadingLesson}),
		setRunCode: runCode => set({runCode}),
	}));
};
