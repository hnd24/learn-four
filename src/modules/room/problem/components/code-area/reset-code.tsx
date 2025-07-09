'use client';
import {useAtomValue, useSetAtom} from 'jotai';
import {RotateCcw} from 'lucide-react';
import {ActionSelector} from '../../../../../components/action-selector';
import {codeAtom, codeFromDB} from '../../atom/code';

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
