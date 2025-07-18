'use client';

import {Hint} from '@/components/hint';
import {Logo} from '@/components/logo';
import SwitchTheme from '@/components/switch-theme';
import {LessonDetailType} from '@/types';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {AvatarStack} from '../../../admin/components/liveblock/avatar-stack';
import {languageDataAtom} from '../atom/language';
import {statusLessonAtom} from '../atom/status';
import PublishButton from './public-action/publish-btn';
import RemoveLessonBtn from './remove-btn';
import Title from './title';

type Props = {
	// preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
	lesson: LessonDetailType;
};

export default function Header({lesson}: Props) {
	// const lesson = usePreloadedQuery(preloadedLesson);

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
				<Logo className="hidden lg:block" link="/admin" />
			</header>
		);
	}
	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link="/admin" />

				<div className="w-3/5 sm:w-1/3 px-4">
					<Title lessonId={lesson._id} title={lesson.name} />
				</div>

				<div className="flex items-center gap-x-3">
					<AvatarStack />
					<div className="hidden md:block"></div>

					<div className="flex gap-2">
						<PublishButton lessonId={lesson._id} />
						<RemoveLessonBtn lessonId={lesson._id} status={lesson.status} />
						<Hint label="switch theme">
							<SwitchTheme className="size-9 rounded-full border-2" />
						</Hint>
					</div>
				</div>
			</div>
		</header>
	);
}
