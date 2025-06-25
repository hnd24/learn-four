export type TOPIC_STATUS = 'public' | 'private';

export type TopicType = {
	_id: string;
	name: string;
	status: TOPIC_STATUS;
};
