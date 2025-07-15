import {AnswerType} from '@/types';
import {atomWithImmer} from 'jotai-immer';

export const answerAtom = atomWithImmer<AnswerType>({});
