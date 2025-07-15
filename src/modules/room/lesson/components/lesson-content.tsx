'use client';

import LoadingState from '@/components/loading-state';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {useMediaQuery} from '@/hook/use-media-query';
import {Preloaded} from 'convex/react';
import {api} from '../../../../../convex/_generated/api';
import {useHydrateTemplate} from '../hook/use-hydrate-template';
import {useHydrateTestCases} from '../hook/use-hydrate-testcases';
import {useLessonId} from '../hook/use-lesson-id';
import CodeArea from './code-area';

type Props = {
	preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
};

export default function LessonContent({preloadedLesson}: Props) {
	const isMobile = useMediaQuery('(max-width: 767px)');
	const lessonId = useLessonId();
	const isPending = false;
	useHydrateTestCases(lessonId);
	useHydrateTemplate(lessonId);

	if (isMobile) {
		return (
			<div className="flex w-screen overflow-hidden">
				{/* TODO: TextEditor */}
				{/* <TextEditor /> */}
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
							{/* TODO: TextEditor */}
							{/* <TextEditor/> */}
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
