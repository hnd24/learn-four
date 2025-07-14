'use client';

import {useQueryProblem} from '@/hook/data/problem';
import {ProblemStateType} from '@/types';
import {useEffect, useState} from 'react';
import SearchName from '../query-problem/search-name';
import SelectLevel from '../query-problem/select-level';
import SelectTopic from '../query-problem/select-topic';
import ProblemTable from './problem-table';
import SkeletonListProblem from './skeleton-list-problem';

export default function ListProblem() {
	const [problems, setProblems] = useState<ProblemStateType[]>([]);

	const {results, isLoading, loadMore, status} = useQueryProblem();

	useEffect(() => {
		if (results) {
			setProblems(results || []);
		}
	}, [results]);

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6 size-full">
			<div className="flex flex-col md:flex-row gap-2">
				<SearchName />
				<div className="flex gap-2">
					<SelectTopic />
					<SelectLevel />
				</div>
			</div>
			{isLoading || status === 'LoadingFirstPage' ? (
				<SkeletonListProblem />
			) : (
				<ProblemTable
					problems={problems}
					loadMore={loadMore}
					isLoading={isLoading}
					status={status}
				/>
			)}
		</div>
	);
}
