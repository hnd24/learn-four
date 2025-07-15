import {DEFAULT_TEST_CASE_ID} from '@/constants';
import {atom} from 'jotai';
import {testCasesAtoms, testCasesFamilyAtom} from '.';

export const activeTestCaseIdBaseAtom = atom<string>();

export const activeTestCaseIdAtom = atom(
	get => get(activeTestCaseIdBaseAtom) ?? get(testCasesAtoms)[0].id ?? DEFAULT_TEST_CASE_ID,
	(get, set, newId: string) => {
		const testCase = get(testCasesFamilyAtom(newId));
		if (testCase) {
			set(activeTestCaseIdBaseAtom, newId);
		}
	},
);
