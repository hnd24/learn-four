import {Id} from '../../convex/_generated/dataModel';
import {TestcaseType} from './common';

export type STATUS_LESSON = 'public' | 'private';

export type STATE_LESSON = 'completed' | 'progress' | 'not-started';

export type LEVEL_LESSON = 'easy' | 'medium' | 'hard';

export type LessonDetailType = {
	_id: Id<'lessons'>;
	_creationTime?: number;
	name: string;
	content: string;
	courseId: string;
	level: 'easy' | 'medium' | 'hard';
	answer: string;
	template: {
		head: string;
		body: string;
		tail: string;
	};
	testcase: TestcaseType[];
	status: 'private' | 'public';
	language: string;
};

export type LessonType = {
	_id: Id<'lessons'>;
	_creationTime: number;
	name: string;
	level: LEVEL_LESSON;
	status: STATUS_LESSON;
};

export type UserLessonType = {
	_id: Id<'lessons'>;
	_creationTime: number;
	name: string;
	level: LEVEL_LESSON;
	status: STATUS_LESSON;
	state: STATE_LESSON;
};

export type lessonsCourseType = {
	courseId: Id<'courses'>;
	status: STATUS_LESSON;
	lessons: LessonType[];
};

export type AddLessonArgs = {
	courseId: Id<'courses'>;
	name: string;
	level: LEVEL_LESSON;
	content: string;
	answer: string;
	template: {
		head: string;
		body: string;
		tail: string;
	};
	testcase: TestcaseType[];
	status: STATUS_LESSON;
	languageId: Id<'languages'>;
};
