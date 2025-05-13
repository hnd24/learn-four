export enum LanguageProgramming {
	JavaScript = "javascript",
	TypeScript = "typescript",
	Python = "python",
	Java = "java",
	Cpp = "cpp",
	CSharp = "csharp",
}
export type DraftCode = {
	language: LanguageProgramming;
	code?: string;
	idRoom?: string;
};
export enum RunCode {
	None = "none",
	Running = "running",
	Success = "success",
	Error = "error",
}
