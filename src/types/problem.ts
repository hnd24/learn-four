import {Id} from '../../convex/_generated/dataModel';
import {AnswerType, TemplateType, TestcaseType} from './common';
import {TopicType} from './topic';

export type STATUS_PROBLEM = 'public' | 'private';

export type USER_PROBLEM_STATE = 'completed' | 'progress' | 'not-started';

export type LEVEL_PROBLEM = 'easy' | 'medium' | 'hard';

export type ProblemStateType = {
	_id: Id<'problems'>;
	name: string;
	level: 'easy' | 'medium' | 'hard';
	topic: TopicType | null;
	status: STATUS_PROBLEM;
	state?: USER_PROBLEM_STATE;
};

export type ProblemDetailType = {
	_id: Id<'problems'>;
	_creationTime?: number;
	name: string;
	document: string;
	level: LEVEL_PROBLEM;
	answer: AnswerType;
	status: STATUS_PROBLEM;
	topic: TopicType;
	authorId: string;
	authorName?: string;
	authorImage?: string;
};

export type ProblemTestcaseType = {
	problemId: Id<'problems'>;
	isPublic: boolean;
	testcase: TestcaseType[];
};

export type ProblemTemplateType = {
	problemId: Id<'problems'>;
	isPublic: boolean;
	code: {
		[language: string]: string;
	};
	template: TemplateType;
	answer: AnswerType;
};

export type UserProblemType = {
	_id: Id<'user_problem'>;
	_creationTime: number;
	code?: AnswerType | undefined;

	state: 'completed' | 'progress';
	userId: string;
	problemId: Id<'problems'>;
};

export type AddProblemArgs = {
	name: string;
	level: LEVEL_PROBLEM;
	document: string;
	answer: AnswerType;
	template: TemplateType;
	testcase: TestcaseType[];
	status: STATUS_PROBLEM;
};

export type UpdateProblemArgs = {
	name: string;
	level: LEVEL_PROBLEM;
	topicId: Id<'topics'>;
	document: string;
	answer: AnswerType;
	template: TemplateType;
	testcase: TestcaseType[];
	status: STATUS_PROBLEM;
	authorId: string;
};
