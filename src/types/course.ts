import {Id} from '../../convex/_generated/dataModel';

export type STATUS_COURSE = 'public' | 'private' | 'pending';

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
	language: string;
	lessons: number;
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
	language: string;
	authorId: string;
	authorName: string;
	authorImage: string;
	lessons: number;
};
