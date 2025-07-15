import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {firaCode} from '@/lib/font';
import {cn} from '@/lib/utils';
import {Trash} from 'lucide-react';
import {LabelInput} from './label-input';

type Props = {
	input: {label: string; value: string};
	onUpdate: (value: string, field: 'label' | 'value') => void;
	onRemove?: () => void;
	canRemove: boolean;
	editableLabel?: boolean;
};

export const InputSection = ({
	input,
	onUpdate,
	onRemove,
	canRemove,
	editableLabel = true,
}: Props) => {
	const {label, value} = input;
	return (
		<div className="group space-y-2">
			<div className="flex items-center justify-between">
				<LabelInput
					editable={editableLabel}
					value={label}
					onChange={value => onUpdate(value, 'label')}
				/>
				{canRemove && (
					<Button
						variant="ghost"
						size="icon"
						onClick={onRemove}
						className="hover:text-destructive invisible size-7 group-hover:visible">
						<Trash className="size-3.5" />
					</Button>
				)}
			</div>
			<Textarea
				value={value}
				onChange={e => onUpdate(e.target.value, 'value')}
				placeholder="Value"
				className={cn('bg-border shadow min-h-10', firaCode.className)}
				rows={1}
			/>
		</div>
	);
};
