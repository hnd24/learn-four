'use client';

import {LevelIcon} from '@/components/level-icon';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
import {useQueryUserProblem} from '@/hook/data/problem';
import type {ProblemStateType} from '@/types';
import {
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Loader2,
	NewspaperIcon,
} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

const getLevelColor = (level: string) => {
	switch (level?.toLowerCase()) {
		case 'easy':
			return 'bg-green-100 text-green-800 hover:bg-green-100';
		case 'medium':
			return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
		case 'hard':
			return 'bg-red-100 text-red-800 hover:bg-red-100';
		default:
			return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
	}
};

export default function ProblemTable() {
	const {results, isLoading, loadMore, status} = useQueryUserProblem();
	const [problems, setProblems] = useState<ProblemStateType[]>([]);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const totalPages = Math.ceil(problems.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentData = problems.slice(startIndex, endIndex);

	useEffect(() => {
		setProblems(results || []);
	}, [results]);

	const goToFirstPage = () => setCurrentPage(1);
	const goToLastPage = () => setCurrentPage(totalPages);
	const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
	const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

	const handleProblemClick = (problemId: string) => {
		router.push(`/room/problem/${problemId}`);
	};

	return (
		<div className="mx-auto w-full flex flex-col gap-4">
			{/* Desktop Table View */}
			<div className="hidden md:block">
				<Table>
					<TableCaption>
						<Button
							disabled={isLoading || status === 'Exhausted'}
							onClick={() => {
								loadMore(ITEM_PER_PAGE);
							}}
							className="gap-2">
							{isLoading ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<NewspaperIcon className="h-4 w-4" />
							)}
							{status === 'LoadingMore'
								? 'Loading...'
								: status === 'Exhausted'
									? 'No more problems'
									: 'Load more'}
						</Button>
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-8" />
							<TableHead className="w-16 text-center">Level</TableHead>
							<TableHead>Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!problems?.length && (
							<TableRow>
								<TableCell colSpan={3} className="text-center py-8">
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<NewspaperIcon className="h-8 w-8" />
										<p>No problems found</p>
									</div>
								</TableCell>
							</TableRow>
						)}
						{(currentData ?? []).map(problem => (
							<TableRow
								key={problem._id}
								className="cursor-pointer hover:bg-muted/50 transition-colors"
								onClick={() => handleProblemClick(problem._id)}>
								<TableCell className="w-8 flex items-center justify-center">
									{problem?.state === 'completed' && (
										<CheckCircle className="size-4 text-green-800" />
									)}
								</TableCell>
								<TableCell className="w-16">
									<div className="flex items-center justify-center">
										<LevelIcon level={problem.level} />
									</div>
								</TableCell>

								<TableCell className="flex flex-1">
									<span className="font-medium truncate">{problem.name}</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Mobile Card View */}
			<div className="md:hidden space-y-3">
				{!problems?.length ? (
					<Card>
						<CardContent className="p-8 text-center">
							<div className="flex flex-col items-center gap-3 text-muted-foreground">
								<NewspaperIcon className="h-12 w-12" />
								<p className="text-lg font-medium">No problems found</p>
								<p className="text-sm">Try adding some problems to get started</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<>
						{(currentData ?? []).map(problem => (
							<Card
								key={problem._id}
								className="cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.98]"
								onClick={() => handleProblemClick(problem._id)}>
								<CardContent className="p-4">
									<div className="flex items-start justify-between gap-3">
										<div className="flex items-start gap-3 flex-1 min-w-0">
											{/* <div className="flex-shrink-0 mt-1">
												<LevelIcon level={problem.level} />
											</div> */}
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<h3 className="font-semibold text-base leading-tight truncate">
														{problem.name}
													</h3>
												</div>
												<div className="flex items-center gap-2 mt-2">
													<Badge
														variant="secondary"
														className={`text-xs ${getLevelColor(problem.level)}`}>
														{problem.level}
													</Badge>
													{problem.state === 'completed' && (
														<Badge
															variant="secondary"
															className={
																'bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1'
															}>
															<CheckCircle />
															Completed
														</Badge>
													)}
												</div>
											</div>
										</div>
										<ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
									</div>
								</CardContent>
							</Card>
						))}

						{/* Mobile Load More Button */}
						<Card className="border-dashed">
							<CardContent className="p-4 text-center">
								<Button
									disabled={isLoading || status === 'Exhausted'}
									onClick={() => loadMore(ITEM_PER_PAGE)}
									variant="ghost"
									className="w-full gap-2">
									{isLoading ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<NewspaperIcon className="h-4 w-4" />
									)}
									{status === 'LoadingMore'
										? 'Loading...'
										: status === 'Exhausted'
											? 'No more problems'
											: 'Load more problems'}
								</Button>
							</CardContent>
						</Card>
					</>
				)}
			</div>

			{/* Mobile-Optimized Pagination Controls */}
			{problems?.length > 0 && (
				<div className="space-y-4">
					{/* Status Display */}
					<div className="text-center text-sm text-muted-foreground">
						Showing {startIndex + 1} to {Math.min(endIndex, problems.length)} of{' '}
						{problems.length} problems
					</div>

					{/* Mobile Pagination */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						{/* Page Size Selector */}
						<div className="flex items-center space-x-2">
							<p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
							<Select
								value={`${pageSize}`}
								onValueChange={value => {
									setPageSize(Number(value));
									setCurrentPage(1);
								}}>
								<SelectTrigger className="h-8 w-[70px]">
									<SelectValue placeholder={pageSize} />
								</SelectTrigger>
								<SelectContent side="top">
									{[5, 10, 20, 30, 40, 50].map(size => (
										<SelectItem key={size} value={`${size}`}>
											{size}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Page Info */}
						<div className="text-sm font-medium">
							Page {currentPage} of {totalPages}
						</div>

						{/* Navigation Buttons */}
						<div className="flex items-center space-x-1">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 bg-transparent"
								onClick={goToFirstPage}
								disabled={currentPage === 1}>
								<span className="sr-only">Go to first page</span>
								<ChevronsLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 bg-transparent"
								onClick={goToPreviousPage}
								disabled={currentPage === 1}>
								<span className="sr-only">Go to previous page</span>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 bg-transparent"
								onClick={goToNextPage}
								disabled={currentPage === totalPages}>
								<span className="sr-only">Go to next page</span>
								<ChevronRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 bg-transparent"
								onClick={goToLastPage}
								disabled={currentPage === totalPages}>
								<span className="sr-only">Go to last page</span>
								<ChevronsRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
