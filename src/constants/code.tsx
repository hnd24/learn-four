import {LanguageProgrammingType} from "@/types";

export enum Theme {
	Light = "light",
	Dark = "vs-dark",
}

export const ListLanguageExtensionPage = {
	JavaScript: "js",
	TypeScript: "ts",
	Java: "java",
	Python: "py",
	CPlusPlus: "cpp",
	Csharp: "cs",
};

export const LanguageProgramming: Record<LanguageProgrammingType, Object> = {
	javascript: {
		id: 63,
		label: "JavaScript",
		extension: ListLanguageExtensionPage.JavaScript,
	},
	typescript: {
		id: 74,
		label: "TypeScript",
		extension: ListLanguageExtensionPage.TypeScript,
	},
	python: {
		id: 71,
		label: "Python",
		extension: ListLanguageExtensionPage.Python,
	},
	java: {
		id: 62,
		label: "Java",
		extension: ListLanguageExtensionPage.Java,
	},
	cpp: {
		id: 54,
		label: "C++",
		extension: ListLanguageExtensionPage.CPlusPlus,
	},
	csharp: {
		id: 51,
		label: "C#",
		extension: ListLanguageExtensionPage.Csharp,
	},
};
