import {ComponentType} from "react";

export type LanguageType = {
	value: string;
	label: string;
	image: string;
};

export type CourseDataType = {
	id: string;
	background: string;
	language: string;
	description: string;
	logoLanguage: string;
	banner: string;
	authorName: string;
	authorImage: string;
	Star: StarType;
	lessons: number;
};

export type StarType = {
	rating: number;
	count: number;
};

export type DifficultLevelProblemType = {
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

export type TopicProblemType = {
	value: string;
};

export type CourseState = {
	_id: string;
	language: string;
	background: string;
	description: string;
	logoLanguage: string;
	banner: string;
	authorImage: string;
	authorName: string;
	star: StarType;
	lessons: number;
};

export type ProblemState = {
	_id: string;
	state: string;
	level: string;
	name: string;
	topic: string;
	star: number;
};
