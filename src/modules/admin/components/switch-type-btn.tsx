'use client';

import {useAtom} from 'jotai';
import {typeAtom} from '../atom/type';

export default function SwitchTypeBtn() {
	const [type, setType] = useAtom(typeAtom);
	return <button>{type}</button>;
}
