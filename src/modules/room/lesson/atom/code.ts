import {atom} from 'jotai';
import {atomWithImmer} from 'jotai-immer';

export const codeAtom = atomWithImmer<string>('');
export const codeFromDB = atomWithImmer<string>('');

export const codeDataAtom = atom(null, (_, set, data: string) => {
	set(codeAtom, data);
	set(codeFromDB, data);
});
