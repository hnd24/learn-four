import {AnswerType, StatusPlace} from "./content";
import {TestcaseType} from "./testcase";

export type LessonDetailType = {
	_id: string;
	courseId: string;
	topic: string;
	name: string;
	star: number;
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
	topic: string;
	star: number;
	level: string;
};

export type setupAnswerType = {header?: Record<string, string>; printFn?: Record<string, string>};
