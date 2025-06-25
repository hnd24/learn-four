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
import {useQueryProblem} from '@/hook/data/problem';
import {ProblemStateType} from '@/types';
import {Plus, Search} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useFilter} from '../hook/use-filters';
import SearchName from './search-name';
import SelectLevel from './select-level';
import SelectTopic from './select-topic';

export default function ListProblem() {
	const [problems, setProblems] = useState<ProblemStateType[] | undefined>(undefined);
	const router = useRouter();
	const {queryProblem, loading} = useQueryProblem();
	const {filter} = useFilter();

	const handleSearch = async () => {
		const params = {
			...(filter.name === '' ? {} : {name: filter.name}),
			...(filter.topic === 'all' ? {} : {topic: filter.topic}),
			...(filter.level === 'all' ? {} : {level: filter.level}),
			...(filter.status === 'all' ? {} : {status: filter.status}),
		};
		if (Object.keys(params).length > 0) {
			console.log('🚀 ~ handleSearch ~ params:', params);
			const data = await queryProblem(params.name, params.topic, params.level, params.status);
			setProblems(data);
		}
	};

	useEffect(() => {
		const fetchProblems = async () => {
			const data = await queryProblem();
			if (data) {
				setProblems(data);
			}
		};
		fetchProblems();
	}, [queryProblem]);

	useEffect(() => {
		handleSearch();
	}, [filter.status]);

	if (loading || !problems) {
		return (
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4">
				<div className="text-lg font-semibold">Loading...</div>
			</div>
		);
	}

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			{/* TODO: search section */}
			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex gap-2">
					<SearchName />
					<Button className="flex md:hidden" onClick={handleSearch}>
						<p className="hidden sm:flex">Search</p>
						<Search className="flex sm:hidden" />
					</Button>
				</div>
				<div className="flex gap-2">
					<SelectTopic />
					<SelectLevel />
					<Button className="hidden md:flex" onClick={handleSearch}>
						Search
					</Button>
				</div>
			</div>

			<div className="mx-auto w-full flex flex-col gap-4">
				{/* TODO: add btn */}
				<Button
					variant="outline"
					size="icon"
					className="w-full bg-darkOceanBlue/15 hover:bg-darkAzureBlue/20 group">
					<Plus className="text-leafyGreen mx-auto group-hover:scale-110" />
				</Button>
				{/* TODO: list problem */}
				<Table>
					<TableCaption>
						<Button> Load more </Button>
					</TableCaption>
					<TableHeader>
						<TableRow>
							{/* <TableHead className="w-6"></TableHead> */}
							<TableHead className="w-20 text-start">Level</TableHead>
							<TableHead>Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{problems.map(problem => (
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
								<TableCell className="text-start">{problem.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
