import {
	ArrowDownWideNarrow,
	CheckCheck,
	Code2,
	LucideIcon,
	RefreshCcwDot,
	WrapText,
} from 'lucide-react';

export type AISelectorOption = {
	value: string;
	label: string;
	icon: LucideIcon;
};

export const AI_SELECTOR_OPTIONS: AISelectorOption[] = [
	{
		value: 'improve',
		label: 'Improve writing',
		icon: RefreshCcwDot,
	},

	{
		value: 'fix',
		label: 'Fix grammar',
		icon: CheckCheck,
	},
	{
		value: 'shorter',
		label: 'Make shorter',
		icon: ArrowDownWideNarrow,
	},
	{
		value: 'longer',
		label: 'Make longer',
		icon: WrapText,
	},
	{
		value: 'solution',
		label: 'Make solution (JS)',
		icon: Code2,
	},
];
