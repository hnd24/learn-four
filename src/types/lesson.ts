import {StatusPlace} from "./content";
import {TestcaseType} from "./testcase";

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

export type LessonType = {
	_id: string;
	topic: string;
	stars: number;
	level: string;
};
