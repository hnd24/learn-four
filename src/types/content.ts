import {ComponentType} from "react";
import {TestcaseType} from "./testcase";

export type StarType = {
	rating: number;
	count: number;
};

export type LevelType = {
	value: number;
	label: string;
	icon: ComponentType<{className?: string}>;
};

export type StarProblemType = {
	value: string;
	star: string;
	icon: ComponentType<{className?: string}>;
};

export type StateProblemType = {
	value: string;
	icon: ComponentType<{className?: string}>;
};

export enum StateProblem {
	PROCESSING = "processing",
	PENDING = "pending",
	DONE = "done",
}
export enum StatusPlace {
	APPROVED = "approved",
	PENDING = "pending",
	REJECTED = "rejected",
}

export type AnswerType = {
	code: Object;
	testcase: TestcaseType[];
};
