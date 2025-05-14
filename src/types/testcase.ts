export type TestcaseType = {
	input: {
		name: string;
		value: string;
	}[];
	except?: string;
};

export enum ExecutedTestcaseStatusType {
	ACCEPTED = "accepted",
	REJECTED = "rejected",
	ERROR = "error",
}

export type TestCaseOutputType = TestcaseType & {
	index: number;
	status: ExecutedTestcaseStatusType;
	output: string;
	runTime: number;
};

export type ExecuteTestcaseType = {
	testcase: TestCaseOutputType[];
	status: ExecutedTestcaseStatusType;
};
