import {Id} from '../../convex/_generated/dataModel';
import {AnswerType, TemplateType, TestcaseType} from './common';

export type STATUS_PROBLEM = 'public' | 'private';

export type USER_PROBLEM_STATE = 'completed' | 'progress' | 'unsolved';

export type LEVEL_PROBLEM = 'easy' | 'medium' | 'hard';

export type ProblemStateType = {
	_id: Id<'problems'>;
	level: string;
	name: string;
	topic: string;
	state?: USER_PROBLEM_STATE;
};

export type ProblemDetailType = {
	_id: Id<'problems'>;
	_creationTime?: number;
	name: string;
	content: string;
	level: LEVEL_PROBLEM;
	answer: AnswerType;
	template: TemplateType;
	testcase: TestcaseType[];
	status: STATUS_PROBLEM;
	topic: string;
	authorId: string;
	authorName?: string;
	authorImage?: string;
};

export type UserProblemType = {
	_id: Id<'user_problem'>;
	_creationTime: number;
	code?: AnswerType | undefined;
	state: 'completed' | 'progress';
	userId: string;
	problemId: Id<'problems'>;
};
