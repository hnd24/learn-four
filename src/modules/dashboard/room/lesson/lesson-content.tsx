'use client';

import LoadingState from '@/components/loading-state';
import NotAccessState from '@/components/not-access';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {useMediaQuery} from '@/hook/use-media-query';
import TextEditor from '@/modules/admin/components/text-editor';
import CodeArea from '@/modules/room/lesson/components/code-area';
import {useHydrateTemplate} from '@/modules/room/lesson/hook/use-hydrate-template';
import {useHydrateTestCases} from '@/modules/room/lesson/hook/use-hydrate-testcases';
import {useLessonId} from '@/modules/room/lesson/hook/use-lesson-id';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {api} from '../../../../../convex/_generated/api';

type Props = {
	preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
};

export default function LessonContent({preloadedLesson}: Props) {
	const lesson = usePreloadedQuery(preloadedLesson);
	const isMobile = useMediaQuery('(max-width: 767px)');
	const lessonId = useLessonId();
	const isPending = false;
	const isPublished = lesson.status === 'public';
	useHydrateTestCases(lessonId);
	useHydrateTemplate(lessonId);

	if (lesson.status === 'private') {
		return <NotAccessState link={`/course/${lesson.courseId}`} />;
	}

	if (isMobile) {
		return (
			<div className="flex w-screen overflow-hidden">
				<TextEditor isPublished={isPublished} />
			</div>
		);
	}
	return (
		<>
			{isPending ? (
				<LoadingState />
			) : (
				<div className="flex-1 overflow-hidden">
					<ResizablePanelGroup direction="horizontal">
						<ResizablePanel defaultSize={50} minSize={30}>
							<TextEditor isPublished={isPublished} />
						</ResizablePanel>
						<ResizableHandle withHandle className="mx-2" />
						<ResizablePanel defaultSize={50} minSize={30}>
							<CodeArea />
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			)}
		</>
	);
}
