import NotFoundState from '@/components/not-found-state';
import {getAuthToken} from '@/modules/auth/lib/auth';
import Header from '@/modules/dashboard/room/lesson/header';
import LessonContent from '@/modules/dashboard/room/lesson/lesson-content';
import {Provider} from '@/modules/room/components/liveblock/provider';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {preloadQuery} from 'convex/nextjs';
import {Preloaded} from 'convex/react';
import {api} from '../../../../../../convex/_generated/api';
import {Id} from '../../../../../../convex/_generated/dataModel';

type Params = Promise<{id: string}>;
export default async function LessonRoomPage({params}: {params: Params}) {
	const {id} = await params;
	if (!id) {
		return <CostumeLoadingPage />;
	}
	const token = await getAuthToken();
	let preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
	try {
		preloadedLesson = await preloadQuery(
			api.lessons.getLessonById,
			{
				lessonId: id as Id<'lessons'>,
			},
			{
				token,
			},
		);
	} catch (error) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<NotFoundState link="/admin" />;
			</div>
		);
	}
	return (
		<Provider lessonId={id}>
			<div className="flex h-screen flex-col overflow-hidden">
				<Header preloadedLesson={preloadedLesson} />
				<main className="mt-16 flex size-full">
					<div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
						<LessonContent preloadedLesson={preloadedLesson} />
					</div>
				</main>
			</div>
		</Provider>
	);
}
