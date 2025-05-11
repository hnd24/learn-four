import {LanguageProgramming} from "@/constants";
import {ComponentType} from "react";

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

export enum StatusPlace {
	APPROVED = "approved",
	PENDING = "pending",
	REJECTED = "rejected",
}

export enum RunCode {
	None = "none",
	Running = "running",
	Success = "success",
	Error = "error",
}

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
	status: StatusPlace;
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

export enum Role {
	SUPER_ADMIN = "super_admin",
	ADMIN = "admin",
	USER = "user",
}

export type UserStateType = {
	userId: string;
	name: string;
	email: string;
	image: string;
	link?: LinkType;
	introduction?: string;
	activities?: ActivityType[];
	locked?: boolean;
	role?: Role;
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

export enum StateProblem {
	PROCESSING = "processing",
	PENDING = "pending",
	DONE = "done",
}

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
	status: StatusPlace;
	lessons: LessonType[];
};

export type TestcaseType = {
	input: {
		name: string;
		value: string;
	}[];
	output?: string;
	isHidden?: boolean;
};

export type LessonDetailType = {
	_id: string;
	courseId: string;
	topic: string;
	name: string;
	stars: number;
	learner: number;
	level: number;
	content: string;

	status: StatusPlace;
	testcase: TestcaseType[];
};

export type UserLessonType = {
	_id: string;
	lessonId: string;
	userId: string;
	code: string;
	isCompleted: boolean;
};
