'use client';

import Comment from '@/components/comment';
import NotAccessState from '@/components/not-access';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {Separator} from '@/components/ui/separator';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useMediaQuery} from '@/hook/use-media-query';
import {cn} from '@/lib/utils';
import TextEditor from '@/modules/admin/components/text-editor';
import {editorStateAtom} from '@/modules/room/atom/editor-state';
import CodeArea from '@/modules/room/lesson/components/code-area';
import {useHydrateTemplate} from '@/modules/room/lesson/hook/use-hydrate-template';
import {useHydrateTestCases} from '@/modules/room/lesson/hook/use-hydrate-testcases';
import {useLessonId} from '@/modules/room/lesson/hook/use-lesson-id';
import {TabSelect} from '@/types';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {useAtomValue} from 'jotai';
import {AppWindow, FileText} from 'lucide-react';
import {useState} from 'react';
import {api} from '../../../../../convex/_generated/api';

type Props = {
	preloadedLesson: Preloaded<typeof api.lessons.getLessonById>;
};

export default function LessonContent({preloadedLesson}: Props) {
	const lesson = usePreloadedQuery(preloadedLesson);
	const isMobile = useMediaQuery('(max-width: 767px)');
	const lessonId = useLessonId();
	const isPublished = lesson.status === 'public';
	const state = useAtomValue(editorStateAtom);
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
		<div className="flex-1 overflow-hidden">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={50} minSize={32}>
					<TabDisplay state={state} status={lesson.status} />
				</ResizablePanel>
				<ResizableHandle withHandle className="mx-2" />
				<ResizablePanel defaultSize={50}>
					<CodeArea />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}

type TabSelectProps = {
	state: 'Unsaved' | 'Saved';
	status: 'public' | 'private';
};

function TabDisplay({state, status}: TabSelectProps) {
	const [activeTab, setActiveTab] = useState<TabSelect>(TabSelect.Document);
	const isPublished = status === 'public';
	const lessonId = useLessonId();
	return (
		<Tabs
			value={activeTab}
			onValueChange={value => setActiveTab(value as TabSelect)}
			className="size-full gap-0  rounded-md">
			<div className="bg-accent flex h-10 shrink-0 items-center justify-between rounded-t-md border border-b-0 px-2">
				<TabsList>
					<TabsTrigger value={TabSelect.Document}>
						<FileText className="size-4 text-blue-500" />
						Document
					</TabsTrigger>
					<Separator orientation="vertical" className="mx-1 !h-4/5" />
					<TabsTrigger value={TabSelect.Comment}>
						<AppWindow className="text-emerald-500" />
						Comment
					</TabsTrigger>
				</TabsList>
				<p
					className={cn(
						'flex text-muted-foreground text-sm',
						(isPublished || activeTab === TabSelect.Comment) && 'hidden',
					)}>
					{state}
				</p>
			</div>
			<TabsContent
				value={TabSelect.Document}
				className="h-full p-0 data-[state=active]:flex data-[state=active]:flex-col">
				<ResizablePanelGroup direction="vertical">
					<div className="bg-border h-full w-full flex-col overflow-hidden border">
						<TextEditor isPublished={isPublished} />
					</div>
				</ResizablePanelGroup>
			</TabsContent>
			<TabsContent value={TabSelect.Comment}>
				<div className="size-full  flex-col border">
					<Comment placeId={lessonId} />
				</div>
			</TabsContent>
		</Tabs>
	);
}
