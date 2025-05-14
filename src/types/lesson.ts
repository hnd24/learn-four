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
