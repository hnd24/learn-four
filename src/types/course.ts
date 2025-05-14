import {StatusPlace} from "./content";
import {LessonType} from "./lesson";

export type CourseStateType = {
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
