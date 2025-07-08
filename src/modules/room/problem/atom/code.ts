import {atom} from 'jotai';
import {atomWithImmer} from 'jotai-immer';

export const codeAtom = atomWithImmer<{[lang: string]: string}>({javascript: '//hello'});
export const codeFromDB = atomWithImmer<{[lang: string]: string}>({javascript: '//hello'});

export const codeDataAtom = atom(null, (_, set, data: {[lang: string]: string}) => {
	set(codeAtom, data);
	set(codeFromDB, data);
});
