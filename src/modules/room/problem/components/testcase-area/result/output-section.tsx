import {ButtonCopy} from '@/components/button-copy';
import {firaCode} from '@/lib/font';
import {cn} from '@/lib/utils';
import {HighlightContent} from '@/modules/room/components/highlight-content';
import {DiffValue} from '../../../types';

type Props = {
	label: string;
	value: string;
	diff: DiffValue;
};

export default function OutputSection({label, value, diff}: Props) {
	return (
		<div>
			<h3 className="text-muted-foreground mb-2 text-xs font-medium capitalize">{label}</h3>
			<div
				className={cn(
					' shadow bg-border group relative rounded-md p-3 text-sm break-all',
					firaCode.className,
				)}>
				<HighlightContent value={diff} origin={value} />

				<ButtonCopy
					value={value}
					className="invisible absolute top-2 right-2 group-hover:visible"
				/>
			</div>
		</div>
	);
}
