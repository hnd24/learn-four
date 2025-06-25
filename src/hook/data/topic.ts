import {topicData} from '@/data';
import {TopicType} from '@/types/topic';
import {useCallback, useState} from 'react';

export const useGetTopics = () => {
	const [loading, setLoading] = useState(false);

	const getTopic = useCallback(async (): Promise<Partial<TopicType[]> | null> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return topicData;
	}, []);

	return {getTopic, loading};
};

export const useAddTopic = () => {
	const [loading, setLoading] = useState(false);

	const addTopic = useCallback(async (topic: Partial<TopicType>): Promise<void> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return {addTopic, loading};
};

export const useDeleteTopic = () => {
	const [loading, setLoading] = useState(false);

	const deleteTopic = useCallback(async (idTopic: string): Promise<void> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

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
