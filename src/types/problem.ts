export type STATUS_PROBLEM = 'public' | 'private';

export type ProblemStateType = {
	_id: string;
	// state: string;
	level: string;
	name: string;
	topic: string;
	star: number;
};

export type ProblemColumnTableType = {
	levelColumn: boolean;
	nameColumn: boolean;
	topicColumn: boolean;
	starColumn: boolean;
};
