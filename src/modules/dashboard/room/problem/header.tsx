'use client';
import {Logo} from '@/components/logo';
import {statusProblemAtom} from '@/modules/room/problem/atom/status';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {api} from '../../../../../convex/_generated/api';

type Props = {
	preloadedProblem: Preloaded<typeof api.problems.getDetailProblemById>;
};

export default function Header({preloadedProblem}: Props) {
	const problem = usePreloadedQuery(preloadedProblem);
	const setStatus = useSetAtom(statusProblemAtom);
	useEffect(() => {
		setStatus(problem?.status);
	}, [problem, setStatus]);

	if (!problem) {
		return (
			<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
				<Logo className="hidden lg:block" link="/problem" />
			</header>
		);
	}
	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link={`/problem`} />

				<div className="w-3/5 sm:w-1/3 px-4 flex items-center justify-center">
					<h1 className="truncate font-semibold capitalize">{problem.name}</h1>
				</div>

				<div className="h-full w-7 lg:w-32" />
			</div>
		</header>
	);
}
