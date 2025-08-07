import {atom} from 'jotai';

export const roleUserAtom = atom<'admin' | 'user' | 'super_admin'>('user');
