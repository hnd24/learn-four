import {highlightDiff} from '@/modules/room/lib/utils';

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

export enum TabValue {
	Editor = 'editor',
	Canvas = 'canvas',
}

export enum TestCaseTab {
	TestCase = 'testcase',
	Result = 'result',
}

type DiffContent = ReturnType<typeof highlightDiff>;
export type DiffValue = DiffContent['expectedHighlighted'] | DiffContent['outputHighlighted'];

export type ApiResponse = {
	stdout: string;
	time: string;
	memory: number;
	stderr: string | null;
	token: string;
	compile_output: string | null;
	message: string | null;
	status: {
		id: number;
		description: string;
	};
	error?: string | null;
};

export type BatchedApiResponse = {
	submissions: ApiResponse[];
};
