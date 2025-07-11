'use client';

import {Hint} from '@/components/hint';
import {Logo} from '@/components/logo';
import {Button} from '@/components/ui/button';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {useSetAtom} from 'jotai';
import {Bell} from 'lucide-react';
import {useEffect} from 'react';
import {api} from '../../../../../convex/_generated/api';
import {statusProblemAtom} from '../atom/status';
import {PublishButton} from './public-action/publish-btn';
import Title from './title';

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
				<Logo className="hidden lg:block" link="/admin" />
			</header>
		);
	}

	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link="/admin" />

				<div className="w-1/3 px-4">
					<Title problemId={problem._id} title={problem.name} />
				</div>

				<div className="flex items-center gap-x-3">
					{/* TODO: Avatar Stack */}
					<div className="hidden md:block"></div>

					<div className="flex gap-2">
						<PublishButton problemId={problem._id} status={problem.status} />
						<Hint label="coming soon">
							<Button
								variant="secondary"
								size="icon"
								className="hidden md:flex group">
								<Bell className=" group-hover:scale-105" />
							</Button>
						</Hint>
					</div>
				</div>
			</div>
		</header>
	);
}
