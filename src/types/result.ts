export type TestResult = {
	testCaseId: string;
	output: string;
	expected: string;
	status: string;
	runtime: number;
	error: string;
};

export enum StatusResult {
	Accepted = 'Accepted',
	WrongAnswer = 'Wrong Answer',
	Error = 'Error',
	CompilationError = 'Compilation Error',
	RuntimeError = 'Runtime Error',
	TimeLimitExceeded = 'Time Limit Exceeded',
}
