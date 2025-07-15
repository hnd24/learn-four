import {TestCaseTab} from '@/types';
import {atom} from 'jotai';

export const activeTabAtom = atom<TestCaseTab>(TestCaseTab.TestCase);
