import {AllLevelIcon, EasyLevelIcon, HardLevelIcon, MediumLevelIcon} from "@/icon/difficuly-icon";
import {FiveStar, FourStar, OneStar, ThreeStar, TwoStar} from "@/icon/star";
import {SolvedIcon, UnsolvedIcon} from "@/icon/state-icon";
import {LanguageType, LevelType, StarProblemType, StateProblemType} from "@/types";

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

export enum LevelEnum {
	All = "All",
	Easy = "Easy",
	Medium = "Medium",
	Hard = "Hard",
}

export const Level: Record<LevelEnum, LevelType> = {
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

export const TopicProblem = {
	Sorting: "Sorting",
	Array: "Array",
	String: "String",
	LinkedList: "Linked List",
	Tree: "Tree",
	Graph: "Graph",
	DynamicProgramming: "Dynamic Programming",
};

export const ListLanguagePage = {
	JavaScript: "js",
	Java: "java",
	Python: "py",
	CPlusPlus: "cpp",
	Csharp: "cs",
};

export enum LanguageEnum {
	English = "English",
	Vietnamese = "Vietnamese",
}

export const Language: Record<LanguageEnum, LanguageType> = {
	English: {
		value: "English",
		label: "English",
		image: "/icon/us-icon.svg",
	},
	Vietnamese: {
		value: "Vietnamese",
		label: "Việt Nam",
		image: "/icon/vietnam-icon.svg",
	},
};
