import {StatusPlace} from './content';
import {LessonType} from './lesson';

export type STATUS_COURSE = 'public' | 'private' | 'pending';

export type CourseStateType = {
	_id: string;
	_creationTime: number;
	content: string;
	status: STATUS_COURSE;
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
