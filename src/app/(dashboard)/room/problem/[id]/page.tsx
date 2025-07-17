import NotFoundState from '@/components/not-found-state';
import {getAuthToken} from '@/modules/auth/lib/auth';

import {Provider} from '@/modules/admin/components/liveblock/provider';
import Header from '@/modules/dashboard/room/problem/header';
import ProblemContent from '@/modules/dashboard/room/problem/problem-content';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {preloadQuery} from 'convex/nextjs';
import {Preloaded} from 'convex/react';
import {api} from '../../../../../../convex/_generated/api';
import {Id} from '../../../../../../convex/_generated/dataModel';

type Params = Promise<{id: string}>;
export default async function ProblemRoomPage({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	const token = await getAuthToken();
	let preloadedProblem: Preloaded<typeof api.problems.getDetailProblemById>;
	try {
		preloadedProblem = await preloadQuery(
			api.problems.getDetailProblemById,
			{
				problemId: id as Id<'problems'>,
			},
			{
				token,
			},
		);
	} catch (error) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<NotFoundState link="/admin/problem" />;
			</div>
		);
	}
	return (
		<Provider problemId={id}>
			<div className="flex h-screen flex-col overflow-hidden">
				<Header preloadedProblem={preloadedProblem} />
				<main className="mt-16 flex size-full">
					<div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
						<ProblemContent preloadedProblem={preloadedProblem} />
					</div>
				</main>
			</div>
		</Provider>
	);
}
