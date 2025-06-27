export type TemplateType = {
	[language: string]: {
		head: string;
		body: string;
		tail: string;
	};
};

export type AnswerType = {
	[language: string]: string;
};

export type TestcaseType = {
	id: string;
	inputs: {
		id: string;
		label: string;
		value: string;
	}[];
	expected: string;
};
