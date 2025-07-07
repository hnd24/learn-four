'use client';

import {LevelIcon} from '@/components/level-icon';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {useQueryProblem} from '@/hook/data/problem';
import {ProblemStateType} from '@/types';
import {Plus} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import SearchName from './search-name';
import SelectLevel from './select-level';
import SelectTopic from './select-topic';

export default function ListProblem() {
	const [problems, setProblems] = useState<ProblemStateType[] | undefined>(undefined);
	const router = useRouter();
	const {data, isPending, loadMore, status} = useQueryProblem();
	useEffect(() => {
		if (data) {
			setProblems(data);
		}
	}, [data]);

	if (isPending || status === 'LoadingFirstPage') {
		return (
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4">
				<div className="text-lg font-semibold">Loading...</div>
			</div>
		);
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
				<Button
					variant="outline"
					size="icon"
					className="w-full bg-darkOceanBlue/15 hover:bg-darkAzureBlue/20 group">
					<Plus className="text-leafyGreen mx-auto group-hover:scale-110" />
				</Button>
				<Table>
					<TableCaption>
						<Button
							onClick={() => {
								loadMore();
							}}>
							Load more
						</Button>
					</TableCaption>
					<TableHeader>
						<TableRow>
							{/* <TableHead className="w-6"></TableHead> */}
							<TableHead className="w-20 text-start">Level</TableHead>
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
								className={'cursor-pointer'}
								onClick={() => {
									router.push(`/admin/room/problem/${problem._id}`);
								}}>
								{/* <TableCell>
									{problem?.state === 'completed' && (
										<CircleCheckBig className="size-4 text-green-500" />
									)}
								</TableCell> */}
								<TableCell className="w-20 min-h-9 flex ml-2 items-center">
									<LevelIcon level={problem.level} />
								</TableCell>
								<TableCell>{problem.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export const ProblemTableSkeleton = () => {
	return (
		<div className="bg-background flex flex-col items-center justify-center rounded-md border">
			<ProblemRowSkeleton />
			<ProblemRowSkeleton />
			<ProblemRowSkeleton />
		</div>
	);
};

export const ProblemRowSkeleton = () => {
	return (
		<div className="flex h-20 w-full items-center border-b p-4 last:border-b-0">
			<div className="flex w-full items-center gap-x-3">
				<div className="flex h-12 w-10 items-center justify-center rounded-md border px-2 py-3">
					<Skeleton className="size-5 rounded" />
				</div>
				<div className="flex flex-col gap-y-2">
					<Skeleton className="h-4 w-32 rounded" />
					<Skeleton className="h-3 w-24 rounded" />
				</div>
			</div>
		</div>
	);
};
