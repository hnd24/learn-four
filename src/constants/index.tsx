import {InputTestCaseType, TestcaseType} from '@/types';
import {nanoid} from 'nanoid';
type LevelType = {
	label: string;
	color: string;
};
export const LEVELS: LevelType[] = [
	{color: 'text-green-500', label: 'easy'},
	{color: 'text-yellow-500', label: 'medium'},
	{color: 'text-red-500', label: 'hard'},
];

export const DRAFT_CODE_KEY = 'editor-draft';
export const DEFAULT_TEST_CASE_ID = nanoid();
export const DEFAULT_INPUT_ID = nanoid();

export const INITIAL_INPUT_TEST_CASE: InputTestCaseType = {
	id: DEFAULT_INPUT_ID,
	label: 'arg0',
	value: '',
};

export const INITIAL_TEST_CASE: TestcaseType = {
	id: DEFAULT_TEST_CASE_ID,
	inputs: [INITIAL_INPUT_TEST_CASE],
	expected: '',
};

export const MAX_RETRIES = 10;
export const RETRY_DELAY_MS = 1000;
