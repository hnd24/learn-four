import {Id} from '../../convex/_generated/dataModel';
import {LanguageType} from './language';

export type STATUS_COURSE = 'public' | 'private';

export type CourseStateType = {
	_id: Id<'courses'>;
	_creationTime: number;
	document: string;
	name: string;
	status: STATUS_COURSE;
	authorId: string;
	logo: string;
	description: string;
	banner: string;
	learner: number;
};

export type CourseDetailType = {
	_id: Id<'courses'>;
	_creationTime: number;
	document: string;
	name: string;
	status: STATUS_COURSE;
	logo: string;
	description: string;
	banner: string;
	learner: number;
	language: LanguageType;
	authorId: string;
	authorName: string;
	authorImage: string;
};

export type AddCourseArgs = {
	description: string;
	banner: string;
	learner: number;
	name: string;
	document: string;
	authorId: string;
	status: STATUS_COURSE;
	logo: string;
	languageId: Id<'languages'>;
};

export type UpdateCourseArgs = {
	status: STATUS_COURSE;
	name: string;
	description: string;
	banner: string;
	logo: string;
};
