import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {LEVELS} from '@/constants';
import {cn} from '@/lib/utils';

type Props = {
	value: 'easy' | 'medium' | 'hard';
	onChange: (value: string) => void;
};

export default function LevelSelection({value, onChange}: Props) {
	const color = LEVELS.find(tag => tag.label === value)?.color || '';
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className={cn('w-full capitalize', color)}>
				<SelectValue placeholder="Select level" />
			</SelectTrigger>
			<SelectContent>
				{LEVELS.map(level => (
					<SelectItem
						key={level.label}
						value={level.label}
						className={cn('capitalize', level.color)}>
						{level.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
