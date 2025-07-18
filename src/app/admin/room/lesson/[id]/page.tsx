import {Provider} from '@/modules/admin/components/liveblock/provider';
import LessonWrapper from '@/modules/room/lesson/components/lesson-wapper';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {Id} from '../../../../../../convex/_generated/dataModel';
type Params = Promise<{id: string}>;

export default async function LessonPage({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	// const token = await getAuthToken();
	// let preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
	// try {
	// 	preloadedLesson = await preloadQuery(
	// 		api.lessons.getLessonById,
	// 		{
	// 			lessonId: id as Id<'lessons'>,
	// 		},
	// 		{
	// 			token,
	// 		},
	// 	);
	// } catch (error) {
	// 	return (
	// 		<div className="h-screen w-screen flex items-center justify-center">
	// 			<NotFoundState link="/admin" />;
	// 		</div>
	// 	);
	// }
	return (
		<Provider lessonId={id}>
			<LessonWrapper lessonId={id as Id<'lessons'>} />
		</Provider>
	);
}
