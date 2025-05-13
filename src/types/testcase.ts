export type TestcaseType = {
	input: {
		name: string;
		value: string;
	}[];
	except?: string;
	isHidden?: boolean;
};

export enum ExecutedTestcaseStatusType {
	ACCEPTED = "accepted",
	REJECTED = "rejected",
	ERROR = "error",
}

export type ExecuteTestcaseType = {
	testcase: (TestcaseType & {index: number; status: ExecutedTestcaseStatusType; output: string})[];
	status: ExecutedTestcaseStatusType;
	runTime?: number;
};
