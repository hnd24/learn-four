export type TestcaseType = {
	input: {
		valueType: string;
		isArray: boolean;
		name: string;
		value: string;
	}[];
	except: string;
};

export enum RunResultStatus {
	ACCEPTED = "accepted",
	REJECTED = "rejected",
	ERROR = "error",
}

export type TestCaseOutputType = TestcaseType & {
	index?: number;
	status: RunResultStatus;
	input: {
		name: string;
		value: string;
	}[];
	output: string;
	runTime: number;
};
export type ResultTestcaseType = {
	testcase: TestCaseOutputType[];
	status: RunResultStatus;
};
