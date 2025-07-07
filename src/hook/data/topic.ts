import {topicData} from '@/data';
import {TopicType} from '@/types/topic';
import {useCallback, useState} from 'react';
import {Id} from '../../../convex/_generated/dataModel';

export const useGetTopics = () => {
	const [loading, setLoading] = useState(false);
	setTimeout(() => {
		setLoading(false);
	}, 2000);
	const data: TopicType[] | null = topicData;

	return {data, loading};
};

export const useAddTopic = () => {
	const [loading, setLoading] = useState(false);

	const addTopic = useCallback(async (name: string): Promise<Id<'topics'>> => {
		const data = {
			name,
			status: 'public',
		};
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return 'new-topic-id' as Id<'topics'>; // Simulate a new topic ID
	}, []);

	return {addTopic, loading};
};

export const useDeleteTopic = () => {
	const [loading, setLoading] = useState(false);

	const deleteTopic = useCallback(
		async (id: Id<'topics'>, topic: Partial<Omit<TopicType, 'id'>>): Promise<void> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		[],
	);

	return {deleteTopic, loading};
};

export const useUpdateTopic = () => {
	const [loading, setLoading] = useState(false);

	const updateTopic = useCallback(async (topic: Partial<TopicType>): Promise<void> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return {updateTopic, loading};
};
