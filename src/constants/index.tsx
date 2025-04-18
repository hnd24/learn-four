import {AllLevelIcon, EasyLevelIcon, HardLevelIcon, MediumLevelIcon} from "@/icon/difficuly-icon";
import {FiveStar, FourStar, OneStar, ThreeStar, TwoStar} from "@/icon/star";
import {SolvedIcon, UnsolvedIcon} from "@/icon/state-icon";
import {
	DifficultLevelProblemType,
	LanguageType,
	StarProblemType,
	StateProblemType,
	TopicProblemType,
} from "@/types";

import {List} from "lucide-react";

export enum PageEnum {
	Home = "Home",
	Problem = "Problem",
	About = "About",
}
export type PageType = {
	name: string;
	path: string;
};

export const DefaultPage: Record<PageEnum, PageType> = {
	Home: {name: "Learn", path: "/"},
	Problem: {name: "Problem", path: "/problem"},
	About: {name: "About", path: "/about"},
};

export enum DifficultLevelProblemEnum {
	All = "All",
	Easy = "Easy",
	Medium = "Medium",
	Hard = "Hard",
}

export const DifficultLevelProblem: Record<DifficultLevelProblemEnum, DifficultLevelProblemType> = {
	All: {
		label: "All",
		value: 0,
		icon: AllLevelIcon,
	},
	Easy: {
		label: "Easy",
		value: 1,
		icon: EasyLevelIcon,
	},
	Medium: {
		label: "Medium",
		value: 2,
		icon: MediumLevelIcon,
	},
	Hard: {
		label: "Hard",
		value: 3,
		icon: HardLevelIcon,
	},
};

export enum StarProblemEnum {
	One = "OneStar",
	Two = "TwoStar",
	Three = "ThreeStar",
	Four = "FourStar",
	Five = "FiveStar",
}

export const StarProblem: Record<StarProblemEnum, StarProblemType> = {
	FiveStar: {
		value: "FiveStar",
		star: "4.1 => 5",
		icon: FiveStar,
	},
	FourStar: {
		value: "FourStar",
		star: "3.1 => 4",
		icon: FourStar,
	},
	ThreeStar: {
		value: "ThreeStar",
		star: "2.1 => 3",
		icon: ThreeStar,
	},
	TwoStar: {
		value: "TwoStar",
		star: "1.1 => 2",
		icon: TwoStar,
	},

	OneStar: {
		value: "OneStar",
		star: "0 => 1",
		icon: OneStar,
	},
};

export enum StateProblemEnum {
	All = "All",
	Solved = "Solved",
	Unsolved = "Unsolved",
}

export const StateProblem: Record<StateProblemEnum, StateProblemType> = {
	All: {
		value: "All",
		icon: List,
	},
	Solved: {
		value: "Solved",
		icon: SolvedIcon,
	},
	Unsolved: {
		value: "Unsolved",
		icon: UnsolvedIcon,
	},
};

export enum TopicProblemEnum {
	Sorting = "Sorting",
	Array = "Array",
	String = "String",
	LinkedList = "LinkedList",
	Tree = "Tree",
	Graph = "Graph",
	DynamicProgramming = "DynamicProgramming",
}
export const TopicProblem: Record<TopicProblemEnum, TopicProblemType> = {
	Sorting: {
		value: "Sorting",
	},
	Array: {
		value: "Array",
	},
	String: {
		value: "String",
	},
	LinkedList: {
		value: "Linked List",
	},
	Tree: {
		value: "Tree",
	},
	Graph: {
		value: "Graph",
	},
	DynamicProgramming: {
		value: "Dynamic Programming",
	},
};

export enum LanguageEnum {
	Vietnamese = "vietnamese",
	English = "english",
}

export const Language: Record<LanguageEnum, LanguageType> = {
	vietnamese: {
		value: "vietnamese",
		label: "Việt Nam",
		image: "/icon/vietnam-icon.svg",
	},
	english: {
		value: "english",
		label: "English",
		image: "/icon/us-icon.svg",
	},
};
