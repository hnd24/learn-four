'use client';

import {api} from '../../../../../convex/_generated/api';

import {Logo} from '@/components/logo';
import {languageDataAtom} from '@/modules/room/lesson/atom/language';
import {statusLessonAtom} from '@/modules/room/lesson/atom/status';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';

type Props = {
	preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
};

export default function Header({preloadedLesson}: Props) {
	const lesson = usePreloadedQuery(preloadedLesson);
	const setLanguage = useSetAtom(languageDataAtom);
	const setStatus = useSetAtom(statusLessonAtom);
	useEffect(() => {
		setStatus(lesson?.status);
		if (lesson?.language) {
			setLanguage(lesson.language);
		}
	}, [lesson, setStatus, setLanguage]);

	if (!lesson) {
		return (
			<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
				<Logo className="hidden lg:block" link="/" />
			</header>
		);
	}
	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link={`/course/${lesson?.courseId}`} />

				<div className="w-3/5 sm:w-1/3 px-4 flex items-center justify-center">
					<h1 className="truncate font-semibold capitalize">{lesson.name}</h1>
				</div>

				<div className="h-full w-7 lg:w-32" />
			</div>
		</header>
	);
}
