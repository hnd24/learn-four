'use client';

import {useFilter} from '@/modules/admin/hook/use-filters';
import {
	AnswerType,
	LEVEL_PROBLEM,
	ProblemDetailType,
	ProblemStateType,
	ProblemTemplateType,
	ProblemTestcaseType,
	STATUS_PROBLEM,
	TemplateType,
	TestcaseType,
} from '@/types';
import {useCallback, useState} from 'react';
import {Id} from '../../../convex/_generated/dataModel';
import {problemData, ProblemDetailData, ProblemTemplateData, ProblemTestcaseData} from '../../data';

export const useGetProblemById = (id: Id<'problems'>) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: ProblemDetailType | undefined = ProblemDetailData;
	return {data, isPending};
};

export const useGetProblemTestcase = (problemId: Id<'problems'>) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: ProblemTestcaseType | undefined = ProblemTestcaseData;
	return {data, isPending};
};

export const useGetProblemTemplate = (problemId: Id<'problems'>) => {
	const [isPending, setIsPending] = useState(false);
	setTimeout(() => {
		setIsPending(false);
	}, 2000);
	const data: ProblemTemplateType | undefined = ProblemTemplateData;
	return {data, isPending};
};

export const useQueryProblem = () => {
	const {filter} = useFilter();
	const params = {
		...(filter.name === '' ? {} : {name: filter.name}),
		...(filter.topic === 'all' ? {} : {topic: filter.topic}),
		...(filter.level === 'all' ? {} : {level: filter.level}),
		...(filter.status === 'all' ? {} : {status: filter.status}),
	};
	console.log('🚀 ~ handleSearch ~ params:', params);
	const [isPending, setIsPending] = useState(false);

	const data: ProblemStateType[] | undefined = problemData;
	const loadMore = () => {
		setIsPending(true);
		setTimeout(() => {
			setIsPending(false);
		}, 2000);
	};
	const status = 'CanLoadMore';

	return {data, isPending, loadMore, status};
};

type UpdateProblemArgs = {
	name: string;
	level: LEVEL_PROBLEM;
	topicId: Id<'topics'>;
	content: string;
	answer: AnswerType;
	template: TemplateType;
	testcase: TestcaseType[];
	status: STATUS_PROBLEM;
	authorId: string;
};

export const useUpdateProblem = () => {
	const [loading, setLoading] = useState(false);

	const updateProblem = useCallback(
		async (problemId: Id<'problems'>, args: Partial<UpdateProblemArgs>): Promise<void> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		[],
	);

	return {updateProblem, loading};
};
