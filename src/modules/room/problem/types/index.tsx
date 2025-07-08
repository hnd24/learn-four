import {highlightDiff} from '../../lib/utils';

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
