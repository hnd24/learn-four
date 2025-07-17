import {firaCode} from '@/lib/font';
import {cn} from '@/lib/utils';

type Props = {
	value: any;
	color?: string;
};

export const PrimitiveContent = ({value, color}: Props) => {
	return <span className={cn(color, firaCode.className)}>{JSON.stringify(value)}</span>;
};
