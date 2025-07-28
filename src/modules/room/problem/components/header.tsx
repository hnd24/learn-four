'use client';

import {Hint} from '@/components/hint';
import {Logo} from '@/components/logo';
import SwitchTheme from '@/components/switch-theme';
import {ProblemDetailType} from '@/types';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {AvatarStack} from '../../../admin/components/liveblock/avatar-stack';
import {statusProblemAtom} from '../atom/status';
import {PublishButton} from './public-action/publish-btn';
import RemoveProblemBtn from './remove-btn';
import Title from './title';

type Props = {
	// preloadedProblem: Preloaded<typeof api.problems.getDetailProblemById>;
	problem: ProblemDetailType;
};

export default function Header({problem}: Props) {


	if (!problem) {
		return (
			<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
				<Logo className="hidden lg:block" link="/admin/problem" />
			</header>
		);
	}

	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link="/admin/problem" />

				<div className="w-3/5 sm:w-1/3 px-4">
					<Title problemId={problem._id} title={problem.name} />
				</div>

				<div className="flex items-center gap-x-3">
					<div className="hidden md:block">
						<AvatarStack />
					</div>

					<div className="flex gap-2">
						<PublishButton problemId={problem._id} />
						<RemoveProblemBtn problemId={problem._id} status={problem.status} />
						<Hint label="switch theme">
							{/* <Button
								variant="secondary"
								size="icon"
								className="hidden md:flex group">
								<Bell className=" group-hover:scale-105" />
							</Button> */}
							<SwitchTheme className="size-9 rounded-full border-2" />
						</Hint>
					</div>
				</div>
			</div>
		</header>
	);
}
