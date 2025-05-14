import {LanguageExtensionEnum, LanguageProgrammingEnum, LanguageProgrammingType} from "@/types";

export enum Theme {
	Light = "light",
	Dark = "vs-dark",
}

export const LanguageProgramming: Record<LanguageProgrammingEnum, LanguageProgrammingType> = {
	javascript: {
		id: 63,
		label: "JavaScript",
		extension: LanguageExtensionEnum.JavaScript,
	},
	typescript: {
		id: 74,
		label: "TypeScript",
		extension: LanguageExtensionEnum.TypeScript,
	},
	python: {
		id: 71,
		label: "Python",
		extension: LanguageExtensionEnum.Python,
	},
	java: {
		id: 62,
		label: "Java",
		extension: LanguageExtensionEnum.Java,
	},
	cpp: {
		id: 54,
		label: "C++",
		extension: LanguageExtensionEnum.CPlusPlus,
	},
	csharp: {
		id: 51,
		label: "C#",
		extension: LanguageExtensionEnum.Csharp,
	},
};
