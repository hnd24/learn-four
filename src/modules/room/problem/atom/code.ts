import {atom} from 'jotai';
import {atomWithImmer} from 'jotai-immer';

const defaultCode = {
	javascript: '',
	typescript: '',
	python: '',
	java: '',
	cpp: '',
	csharp: '',
	ruby: '',
	go: '',
	swift: '',
	kotlin: '',
	php: '',
};

export const codeAtom = atomWithImmer<{[lang: string]: string}>(defaultCode);
export const codeFromDB = atomWithImmer<{[lang: string]: string}>(defaultCode);

export const codeDataAtom = atom(null, (_, set, data: {[lang: string]: string}) => {
	set(codeAtom, data);
	set(codeFromDB, data);
});
