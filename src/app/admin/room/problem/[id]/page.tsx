import {Provider} from '@/modules/admin/components/liveblock/provider';
import ProblemWrapper from '@/modules/room/problem/components/problem-wrapper';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {Id} from '../../../../../../convex/_generated/dataModel';
type Params = Promise<{id: string}>;

export default async function ProblemDetailPage({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	// const token = await getAuthToken();
	// const preloadedProblem = await preloadQuery(
	// 	api.problems.getDetailProblemById,
	// 	{
	// 		problemId: id as Id<'problems'>,
	// 	},
	// 	{
	// 		token,
	// 	},
	// );

	// if (!preloadedProblem) {
	// 	return (
	// 		<div className="h-screen w-screen flex items-center justify-center">
	// 			<NotFoundState link="/admin/problem" />
	// 		</div>
	// 	);
	// }

	return (
		<Provider problemId={id}>
			<ProblemWrapper problemId={id as Id<'problems'>} />
		</Provider>
	);
}
