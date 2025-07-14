'use client';

import {Hint} from '@/components/hint';
import {Logo} from '@/components/logo';
import {Button} from '@/components/ui/button';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {useSetAtom} from 'jotai';
import {Bell} from 'lucide-react';
import {useEffect} from 'react';
import {api} from '../../../../../convex/_generated/api';
import {statusLessonAtom} from '../atom/status';
import PublishButton from './public-action/publish-btn';
import Title from './title';

type Props = {
	preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
};

export default function Header({preloadedLesson}: Props) {
	const lesson = usePreloadedQuery(preloadedLesson);
	const setStatus = useSetAtom(statusLessonAtom);
	useEffect(() => {
		setStatus(lesson?.status);
	}, [lesson, setStatus]);

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

				<div className="w-1/3 px-4">
					<Title lessonId={lesson._id} title={lesson.name} />
				</div>

				<div className="flex items-center gap-x-3">
					{/* TODO: Avatar Stack */}
					<div className="hidden md:block"></div>

					<div className="flex gap-2">
						<PublishButton lessonId={lesson._id} />
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
