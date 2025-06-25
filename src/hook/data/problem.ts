import {ProblemStateType} from '@/types';
import {useCallback, useState} from 'react';
import {problemData} from '../../data';

export const useGetProblems = () => {
	const [loading, setLoading] = useState(false);

	const getProblems = useCallback(
		async (
			topic?: string,
			level?: string,
			name?: string,
			status?: string,
		): Promise<ProblemStateType[] | undefined> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
			return problemData;
		},
		[],
	);

	return {getProblems, loading};
};

export const useQueryProblem = () => {
	const [loading, setLoading] = useState(false);

	const queryProblem = useCallback(
		async (
			name?: string,
			topic?: string,
			level?: string,
			status?: string,
		): Promise<ProblemStateType[] | undefined> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
			return problemData;
		},
		[],
	);

	return {queryProblem, loading};
};
