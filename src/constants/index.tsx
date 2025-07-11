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

export const JUDGE0_LANGUAGE_ID_MAP: Record<string, number> = {
	63: 102, // JavaScript (Node.js 22.08.0)
	74: 101, // TypeScript (5.6.2)
	71: 100, // Python (3.12.5)
	62: 91, // Java (JDK 17.0.6)
	54: 54, // C++ (GCC 14.1.0)
	51: 51, // C# (Mono
};

export const DEFAULT_BANNER_URL =
	'https://jxavqwzcp5avqdlx.public.blob.vercel-storage.com/1-xKQoIdSoTTEa98cExqAsy.jpeg';
export const DEFAULT_LOGO_URL = 'https://github.com/shadcn.png';
