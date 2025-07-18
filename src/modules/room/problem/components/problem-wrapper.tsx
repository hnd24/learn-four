'use client';

import NotFoundState from '@/components/not-found-state';
import {useGetProblemById} from '@/hook/data/problem';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {Id} from '../../../../../convex/_generated/dataModel';
import Header from './header';
import ProblemContent from './problem-content';

type Props = {
	problemId: Id<'problems'>;
};

export default function ProblemWrapper({problemId}: Props) {
	const {data: problem, isPending, error} = useGetProblemById(problemId);
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
		<div className="flex h-screen flex-col overflow-hidden">
			<Header problem={problem} />
			<main className="mt-16 flex size-full">
				<div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
					<ProblemContent problem={problem} />
				</div>
			</main>
		</div>
	);
}
