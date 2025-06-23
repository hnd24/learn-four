import {STATUS_COURSE, STATUS_PROBLEM} from '@/types';
import {Clock9, Layers, LockKeyhole, LucideIcon, SquareLibrary} from 'lucide-react';

type STATUS_TYPE = {
	label: string;
	icon: LucideIcon;
};

export const STATUS_COURSE_ITEMS: Record<STATUS_COURSE | 'all', STATUS_TYPE> = {
	all: {
		label: 'All',
		icon: Layers,
	},
	public: {
		label: 'Public',
		icon: SquareLibrary,
	},
	private: {
		label: 'Private',
		icon: LockKeyhole,
	},
	pending: {
		label: 'Pending',
		icon: Clock9,
	},
};

export const STATUS_PROBLEM_ITEMS: Record<STATUS_PROBLEM | 'all', STATUS_TYPE> = {
	all: {
		label: 'All',
		icon: Layers,
	},
	public: {
		label: 'Public',
		icon: SquareLibrary,
	},
	private: {
		label: 'Private',
		icon: LockKeyhole,
	},
};
