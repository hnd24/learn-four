import {firaCode} from '@/lib/font';
import {cn} from '@/lib/utils';
import {DiffValue} from '@/types';
import {JSONContent} from './json-content';

type Props = {
	value: DiffValue;
	origin: string;
};

export const HighlightContent = ({value, origin}: Props) => {
	if (value) {
		return <JSONContent value={value} />;
	}
	return <pre className={cn('whitespace-pre-wrap', firaCode.className)}>{origin}</pre>;
};
