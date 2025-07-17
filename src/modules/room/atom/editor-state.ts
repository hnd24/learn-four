import {atom} from 'jotai';

export const editorStateAtom = atom<'Unsaved' | 'Saved'>('Saved');
