import {NUMBER_COMMENTS_PER_LOAD} from '@/constants';
import {useConvexMutation} from '@convex-dev/react-query';
import {useMutation} from '@tanstack/react-query';
import {usePaginatedQuery} from 'convex/react';
import {useEffect} from 'react';
import {api} from '../../../convex/_generated/api';
export const useGetCommentsByPlaceId = (placeId: string) => {
	const {results, isLoading, loadMore, status} = usePaginatedQuery(
		api.comment.getCommentsByPlace,
		{
			placeId,
		},
		{initialNumItems: NUMBER_COMMENTS_PER_LOAD},
	);
	useEffect(() => {
		if (isLoading) return;

		if (results.length < NUMBER_COMMENTS_PER_LOAD && status === 'CanLoadMore') {
			loadMore(NUMBER_COMMENTS_PER_LOAD - results.length);
		}
	}, [isLoading, results.length, status, loadMore]);
	return {results, isLoading, loadMore, status};
};

export const useAddComment = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.comment.createComment),
	});
};

export const useDeleteComment = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.comment.deleteComment),
	});
};

export const useUpdateComment = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.comment.updateComment),
	});
};

export const useReplyToComment = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.comment.replyToComment),
	});
};

export const useToggleLike = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.comment.toggleLike),
	});
};
export const useToggleDislike = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.comment.toggleDislike),
	});
};
