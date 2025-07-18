'use client';

import NotFoundState from '@/components/not-found-state';
import {useGetLessonById} from '@/hook/data/lesson';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {Id} from '../../../../../convex/_generated/dataModel';
import Header from './header';
import LessonContent from './lesson-content';

type Props = {
	lessonId: Id<'lessons'>;
};

export default function LessonWrapper({lessonId}: Props) {
	const {data: lesson, isLoading, error} = useGetLessonById(lessonId);
	console.log('🚀 ~ LessonWrapper ~ error:', error);
	if (error) {
		return (
			<div className="h-screen w-screen">
				<NotFoundState link="/admin" />
			</div>
		);
	}
	if (isLoading || !lesson) {
		return (
			<div className="h-screen w-screen ">
				<CostumeLoadingPage />
			</div>
		);
	}

	return (
		<div className="flex h-screen flex-col overflow-hidden">
			<Header lesson={lesson} />
			<main className="mt-16 flex size-full">
				<div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
					<LessonContent lesson={lesson} />
				</div>
			</main>
		</div>
	);
}
