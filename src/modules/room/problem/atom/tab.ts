import {atom} from 'jotai';
import {TestCaseTab} from '../types';

export const activeTabAtom = atom<TestCaseTab>(TestCaseTab.TestCase);
