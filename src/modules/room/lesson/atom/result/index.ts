import {TestResult} from '@/types';
import {atom} from 'jotai';

export const resultsAtom = atom<TestResult[]>([]);

export const isRunningAtom = atom(false);
