import {LanguageProgramming} from "@/constants";
import {ComponentType} from "react";

export type Theme = "light" | "vs-dark";

export type DraftCode = {
	language: LanguageProgramming;
	code?: string;
	idRoom?: string;
};

export type LanguageType = {
	value: string;
	label: string;
	image: string;
};

export type StarType = {
	rating: number;
	count: number;
};

export type LevelType = {
	value: number;
	label: string;
	icon: ComponentType<{className?: string}>;
};

export type StarProblemType = {
	value: string;
	star: string;
	icon: ComponentType<{className?: string}>;
};

export type StateProblemType = {
	value: string;
	icon: ComponentType<{className?: string}>;
};

export type CourseStateType = {
	_id: string;
	language: string;
	background: string;
	extension: string;
	description: string;
	logoLanguage: string;
	banner: string;
	authorId: string;
	authorImage: string;
	authorName: string;
	star: number;
	learner: number;
	status: StatusPlaceType;
	lessons: number;
};

export type ProblemStateType = {
	_id: string;
	// state: string;
	level: string;
	name: string;
	topic: string;
	star: number;
};

export type UserStateType = {
	userId: string;
	name: string;
	email: string;
	image: string;
	link?: LinkType;
	introduction?: string;
	activities?: ActivityType[];
	locked?: boolean;
	role?: RoleType;
};

export type LinkType = {
	facebook?: string;
	linkedIn?: string;
	github?: string;
	youtube?: string;
	phone?: string;
};
export type ActivityType = {
	day: string;
	level: number;
};

export type ProblemColumnTableType = {
	levelColumn: boolean;
	nameColumn: boolean;
	topicColumn: boolean;
	starColumn: boolean;
};

export type LessonType = {
	_id: string;
	topic: string;
	stars: number;
	level: string;
};

export type CourseDetailStateType = {
	_id: string;
	language: string;
	background: string;
	description: string;
	logoLanguage: string;
	banner: string;
	authorId: string;
	authorImage: string;
	authorName: string;
	star: number;
	learner: number;
	status: StatusPlaceType;
	lessons: LessonType[];
};

export type processingNotifyType = "pending" | "processing";
export type StatusPlaceType = "pending" | "approved" | "rejected";
export type RoleType = "admin" | "user";
