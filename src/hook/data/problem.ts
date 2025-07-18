'use client';

import {ITEM_PER_PAGE} from '@/constants';
import {useFilter} from '@/hook/search/use-filters';
import {STATUS_PROBLEM} from '@/types';
import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {usePaginatedQuery} from 'convex/react';
import {useEffect} from 'react';
import {api} from '../../../convex/_generated/api';
import {Id} from '../../../convex/_generated/dataModel';

export const useGetProblemById = (problemId: Id<'problems'>) => {
	return useQuery(convexQuery(api.problems.getDetailProblemById, {problemId}));
};

export const useGetProblemTestcase = (problemId: Id<'problems'>) => {
	return useQuery(convexQuery(api.problems.getTestcaseByProblemId, {problemId}));
};

export const useGetProblemTemplate = (problemId: Id<'problems'>) => {
	return useQuery(convexQuery(api.problems.getTemplateByProblemId, {problemId}));
};

export const useQueryProblem = () => {
	const {filter} = useFilter();
	const params = {
		...{name: filter.name === '' ? undefined : filter.name},
		...{topicId: filter.topic === 'all' ? undefined : (filter.topic as Id<'topics'>)},
		...{level: filter.level === 'all' ? undefined : filter.level},
		...{status: filter.status === 'all' ? undefined : (filter.status as STATUS_PROBLEM)},
	};

	const {results, isLoading, loadMore, status} = usePaginatedQuery(
		api.problems.queryProblems,
		params,
		{initialNumItems: ITEM_PER_PAGE},
	);

	useEffect(() => {
		if (isLoading) return;

		if (results.length < ITEM_PER_PAGE && status === 'CanLoadMore') {
			loadMore(ITEM_PER_PAGE - results.length);
		}
	}, [isLoading, results.length, status, loadMore]);

	return {results, isLoading, loadMore, status};
};

export const useQueryUserProblem = () => {
	const {filter} = useFilter();
	const params = {
		...{name: filter.name === '' ? undefined : filter.name},
		...{topicId: filter.topic === 'all' ? undefined : (filter.topic as Id<'topics'>)},
		...{level: filter.level === 'all' ? undefined : filter.level},
	};

	const {results, isLoading, loadMore, status} = usePaginatedQuery(
		api.problems.queryUserProblems,
		params,
		{initialNumItems: ITEM_PER_PAGE},
	);

	useEffect(() => {
		if (isLoading) return;

		if (results.length < ITEM_PER_PAGE && status === 'CanLoadMore') {
			loadMore(ITEM_PER_PAGE - results.length);
		}
	}, [isLoading, results.length, status, loadMore]);

	return {results, isLoading, loadMore, status};
};

export const useUpdateProblem = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.problems.updateProblem),
	});
};

export const useGetStatusProblem = (problemId: Id<'problems'>) => {
	return useQuery(convexQuery(api.problems.getStatusProblemById, {problemId}));
};

export const useAddProblem = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.problems.createProblem),
	});
};

export const useUpdateUserProblem = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.problems.updateUserProblem),
	});
};

export const useDeleteProblem = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.problems.deleteProblem),
	});
};
