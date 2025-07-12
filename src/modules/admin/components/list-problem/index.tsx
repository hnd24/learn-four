'use client';

import {LevelIcon} from '@/components/level-icon';
import {Button} from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {ITEM_PER_PAGE} from '@/constants';
import {useQueryProblem} from '@/hook/data/problem';
import {ProblemStateType} from '@/types';
import {Loader2, Lock, NewspaperIcon} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import SearchName from '../query-problem/search-name';
import SelectLevel from '../query-problem/select-level';
import SelectTopic from '../query-problem/select-topic';
import AddBtn from './add-btn';
import SkeletonListProblem from './skeleton-list-problem';

export default function ListProblem() {
	const [problems, setProblems] = useState<ProblemStateType[]>([]);
	const router = useRouter();
	const {results, isLoading, loadMore, status} = useQueryProblem();

	useEffect(() => {
		if (results) {
			setProblems(results || []);
		}
	}, [results]);

	if (isLoading || status === 'LoadingFirstPage') {
		// if (true) {
		return <SkeletonListProblem />;
	}

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<div className="flex flex-col md:flex-row gap-2">
				<SearchName />
				<div className="flex gap-2">
					<SelectTopic />
					<SelectLevel />
				</div>
			</div>

			<div className="mx-auto w-full flex flex-col gap-4">
				<AddBtn />
				<Table>
					<TableCaption>
						<Button
							disabled={isLoading || status === 'Exhausted'}
							onClick={() => {
								loadMore(ITEM_PER_PAGE);
							}}>
							{isLoading ? <Loader2 className=" animate-spin" /> : <NewspaperIcon />}
							{status === 'LoadingMore' ? 'Load more' : 'No more'}
						</Button>
					</TableCaption>
					<TableHeader>
						<TableRow>
							{/* <TableHead className="w-6"></TableHead> */}
							<TableHead />
							<TableHead>Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!problems && (
							<TableRow>
								<TableCell colSpan={2} className="text-center">
									No problems found
								</TableCell>
							</TableRow>
						)}
						{(problems ?? []).map(problem => (
							<TableRow
								key={problem._id}
								className="cursor-pointer"
								onClick={() => {
									router.push(`/admin/room/problem/${problem._id}`);
								}}>
								{/* <TableCell>
											{lesson?.state === 'completed' && (
												<CircleCheckBig className="size-4 text-green-500" />
											)}
										</TableCell> */}
								<TableCell className="w-7 min-h-8  justify-center items-center">
									<LevelIcon level={problem.level} />
								</TableCell>

								<TableCell className=" flex flex-1">
									<div className=" w-52 sm:w-auto text-start flex items-center gap-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
										{problem.status === 'private' && (
											<Lock className=" size-3" />
										)}
										{problem.name}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
