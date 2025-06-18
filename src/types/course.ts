import {StatusPlace} from "./content";
import {LessonType} from "./lesson";

export type STATUS = "private" | "public" | "pending";

export type CourseStateType = {
	_id: string;
	_creationTime: number;
	content: string;
	status: STATUS;
	authorId: string;
	logo: string;
	description: string;
	banner: string;
	learner: number;
	language: string;
	lessons: number;
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
	status: StatusPlace;
	lessons: LessonType[];
};
