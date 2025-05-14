export enum LanguageProgrammingEnum {
	JavaScript = "javascript",
	TypeScript = "typescript",
	Python = "python",
	Java = "java",
	Cpp = "cpp",
	CSharp = "csharp",
}
export type DraftCode = {
	language: LanguageProgrammingEnum;
	code?: string;
	idRoom?: string;
};
export enum RunCode {
	None = "none",
	Running = "running",
	Success = "success",
	Error = "error",
}

export enum LanguageExtensionEnum {
	JavaScript = "js",
	TypeScript = "ts",
	Java = "java",
	Python = "py",
	CPlusPlus = "cpp",
	Csharp = "cs",
}

export type LanguageProgrammingType = {
	id: number;
	label: string;
	extension: LanguageExtensionEnum;
};
