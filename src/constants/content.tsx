import {AllLevelIcon, EasyLevelIcon, HardLevelIcon, MediumLevelIcon} from '@/icon/difficuly-icon';
import {FiveStar, FourStar, OneStar, ThreeStar, TwoStar} from '@/icon/star';
import {SolvedIcon, UnsolvedIcon} from '@/icon/state-icon';
import {LevelType, StarProblemType, StateProblemType} from '@/types';
import {List} from 'lucide-react';

export enum LevelEnum {
	All = 'all',
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
}

export const Level: Record<LevelEnum, LevelType> = {
	all: {
		label: 'All',
		value: 0,
		icon: AllLevelIcon,
	},
	easy: {
		label: 'Easy',
		value: 1,
		icon: EasyLevelIcon,
	},
	medium: {
		label: 'Medium',
		value: 2,
		icon: MediumLevelIcon,
	},
	hard: {
		label: 'Hard',
		value: 3,
		icon: HardLevelIcon,
	},
};

export enum StarProblemEnum {
	One = 'OneStar',
	Two = 'TwoStar',
	Three = 'ThreeStar',
	Four = 'FourStar',
	Five = 'FiveStar',
}

export const StarProblem: Record<StarProblemEnum, StarProblemType> = {
	FiveStar: {
		value: 'FiveStar',
		star: '4.1 => 5',
		icon: FiveStar,
	},
	FourStar: {
		value: 'FourStar',
		star: '3.1 => 4',
		icon: FourStar,
	},
	ThreeStar: {
		value: 'ThreeStar',
		star: '2.1 => 3',
		icon: ThreeStar,
	},
	TwoStar: {
		value: 'TwoStar',
		star: '1.1 => 2',
		icon: TwoStar,
	},

	OneStar: {
		value: 'OneStar',
		star: '0 => 1',
		icon: OneStar,
	},
};

export enum StateProblemEnum {
	All = 'All',
	Solved = 'Solved',
	Unsolved = 'Unsolved',
}

export const StateProblem: Record<StateProblemEnum, StateProblemType> = {
	All: {
		value: 'All',
		icon: List,
	},
	Solved: {
		value: 'Solved',
		icon: SolvedIcon,
	},
	Unsolved: {
		value: 'Unsolved',
		icon: UnsolvedIcon,
	},
};
