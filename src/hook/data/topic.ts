import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../../../convex/_generated/api';

export const useGetTopics = () => {
	return useQuery(convexQuery(api.topic.getTopics, {}));
};

export const useAddTopic = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.topic.createTopic),
	});
};

export const useDeleteTopic = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.topic.deleteTopic),
	});
};

export const useUpdateTopic = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.topic.updateTopic),
	});
};
