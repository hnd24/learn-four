import {Id} from '../../convex/_generated/dataModel';

export type TOPIC_STATUS = 'public' | 'private';

export type TopicType = {
	_id: Id<'topics'>;
	_creationTime?: number;
	name: string;
	status: TOPIC_STATUS;
};
