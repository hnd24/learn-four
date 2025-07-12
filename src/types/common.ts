export type TemplateType = {
	[language: string]: {
		head?: string;
		body?: string;
		tail?: string;
	};
};

export type AnswerType = {
	[language: string]: string;
};

export type InputTestCaseType = {
	id: string;
	label: string;
	value: string;
};

export type TestcaseType = {
	id: string;
	inputs: InputTestCaseType[];
	expected: string;
};
