'use client';

import NotFoundState from '@/components/not-found-state';
import {useGetProblemById} from '@/hook/data/problem';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import {statusProblemAtom} from '../atom/status';
import Header from './header';
import ProblemContent from './problem-content';

type Props = {
	problemId: Id<'problems'>;
};

export default function ProblemWrapper({problemId}: Props) {
	const setStatus = useSetAtom(statusProblemAtom);
	const {data: problem, isPending, error} = useGetProblemById(problemId);
	useEffect(() => {
		setStatus(problem?.status);
	}, [problem, setStatus]);
	if (error) {
		return (
			<div className="h-screen w-screen">
				<NotFoundState link="/admin/problem" />;
			</div>
		);
	}
	if (isPending || !problem) {
		return (
			<div className="h-screen w-screen ">
				<CostumeLoadingPage />;
			</div>
		);
	}

	return (
		<div className="flex h-screen flex-col ">
			<Header problem={problem} />
			<main className="mt-16 flex size-full">
				<div className="flex h-[calc(100vh-4rem)] w-full p-2.5">
					<ProblemContent problem={problem} />
				</div>
			</main>
		</div>
	);
}
