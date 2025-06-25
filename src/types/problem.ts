export type STATUS_PROBLEM = 'public' | 'private';

export type USER_PROBLEM_STATE = 'completed' | 'progress' | 'unsolved';

export type ProblemStateType = {
	_id: string;
	// state: string;
	level: string;
	name: string;
	topic: string;
	state?: USER_PROBLEM_STATE;
};

export type ProblemColumnTableType = {
	levelColumn: boolean;
	nameColumn: boolean;
	topicColumn: boolean;
	starColumn: boolean;
};
