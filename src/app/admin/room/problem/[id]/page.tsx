import {ProblemDetailData} from '@/data';
import {getAuthToken} from '@/modules/auth/lib/auth';
import Header from '@/modules/room/problem/components/header';
import CostumeLoadingPage from '@/page/costume-loading-page';

type Params = Promise<{id: string}>;

export default async function ProblemDetailPage({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	const token = await getAuthToken();

	// const problem = await preloadQuery(
	// 	api.problems.getDetailProblemById,
	// 	{
	// 		problemId: id as Id<'problems'>,
	// 	},
	// 	{ token },
	// )

	const problem = ProblemDetailData;

	return (
		// TODO: room manager
		<div className="flex h-screen flex-col overflow-hidden">
			{/* TODO: Header */}
			<Header problem={problem} />
			<main className="mt-16 flex size-full">
				<div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
					{/* TODO: documentContent */}
				</div>
			</main>
		</div>
	);
}
