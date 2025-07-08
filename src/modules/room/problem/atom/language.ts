import {LanguageType} from '@/types';
import {atom} from 'jotai';

export const languagesAtom = atom<LanguageType>();

export const languageDataAtom = atom(null, (_, set, data: LanguageType) => {
	set(languagesAtom, data);
});
