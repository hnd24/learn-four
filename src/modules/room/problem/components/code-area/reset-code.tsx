'use client';
import {useAtomValue, useSetAtom} from 'jotai';
import {RotateCcw} from 'lucide-react';
import {codeAtom, codeFromDB} from '../../atom/code';
import {ActionSelector} from '../action-selector';

export const ResetCodeButton = () => {
	const setCode = useSetAtom(codeAtom);
	const defaultCode = useAtomValue(codeFromDB);

	const onClick = () => {
		setCode(defaultCode || '');
	};

	return (
		<ActionSelector title="Reset Code" onClick={onClick}>
			<RotateCcw />
		</ActionSelector>
	);
};
