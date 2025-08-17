'use client';
import Comment from '@/components/comment';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {Separator} from '@/components/ui/separator';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useMediaQuery} from '@/hook/use-media-query';
import {cn} from '@/lib/utils';
import {ProblemDetailType, TabSelect} from '@/types';
import {useAtomValue} from 'jotai';
import {AppWindow, FileText} from 'lucide-react';
import {useState} from 'react';
import TextEditor from '../../../admin/components/text-editor';
import {editorStateAtom} from '../../atom/editor-state';
import {statusProblemAtom} from '../atom/status';
import {useHydrateTemplate} from '../hook/use-hydrate-template';
import {useHydrateTestCases} from '../hook/use-hydrate-testcases';
import {useProblemId} from '../hook/use-problem-id';
import CodeArea from './code-area';
type Props = {
	// preloadedProblem: Preloaded<typeof api.problems.getDetailProblemById>;
	problem: ProblemDetailType;
};

export default function ProblemContent({problem}: Props) {
	const isMobile = useMediaQuery('(max-width: 767px)');
	const problemId = useProblemId();
	useHydrateTestCases(problemId);
	useHydrateTemplate(problemId);
	const state = useAtomValue(editorStateAtom);

	if (isMobile) {
		return (
			<div className="flex w-screen ">
				<TextEditor isPublished={problem.status === 'public'} />
			</div>
		);
	}
	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={50}>
				<TabDisplay state={state} />
			</ResizablePanel>
			<ResizableHandle withHandle className="mx-2" />
			<ResizablePanel defaultSize={50}>
				<CodeArea />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}

type TabSelectProps = {
	state: 'Unsaved' | 'Saved';
};

function TabDisplay({state}: TabSelectProps) {
	const [activeTab, setActiveTab] = useState<TabSelect>(TabSelect.Document);
	const status = useAtomValue(statusProblemAtom);
	const isPublished = status === 'public';
	const problemId = useProblemId();
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
					<Comment placeId={problemId} />
				</div>
			</TabsContent>
		</Tabs>
	);
}
