import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTime(value: number) {
	const numberFormatter = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 1,
	});

	if (value < 1) {
		return `${numberFormatter.format(value * 1000)} ms`;
	} else {
		return `${numberFormatter.format(value)} s`;
	}
}
