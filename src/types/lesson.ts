import {AnswerType, StatusPlace} from './content';
import {TestcaseType} from './testcase';

export type LEVEL_LESSON = 'easy' | 'medium' | 'hard';

export type LessonDetailType = {
	_id: string;
	courseId: string;
	topic: string;
	name: string;
	learner: number;
	level: number;
	content: string;
	structureAnswer: object;
	setupAnswer: setupAnswerType;
	nameFn: string;
	answer: AnswerType;
	status: StatusPlace;
	testcaseSample: TestcaseType[];
};

export type LessonType = {
	_id: string;
	name: string;
	level: LEVEL_LESSON;
	state?: 'completed' | 'progress' | 'unsolved';
};

export type setupAnswerType = {header?: Record<string, string>; printFn?: Record<string, string>};
