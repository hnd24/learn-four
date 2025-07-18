'use client';
import LoadingState from '@/components/loading-state';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {useMediaQuery} from '@/hook/use-media-query';
import {ProblemDetailType} from '@/types';
import {useAtomValue} from 'jotai';
import {FileText} from 'lucide-react';
import TextEditor from '../../../admin/components/text-editor';
import {editorStateAtom} from '../../atom/editor-state';
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
	const isPending = false;
	useHydrateTestCases(problemId);
	useHydrateTemplate(problemId);
	const state = useAtomValue(editorStateAtom);

	if (isMobile) {
		return (
			<div className="flex w-screen overflow-hidden">
				<TextEditor isPublished={problem.status === 'public'} />
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
							<div className="bg-border flex h-full w-full flex-col overflow-hidden rounded-md border">
								<div className="bg-accent relative flex h-10 w-full shrink-0 items-center justify-between rounded-t-md border-b px-4">
									<div className="flex items-center  gap-1.5 space-x-2 text-sm select-none">
										<FileText className="size-4 text-blue-500" />
										Document
									</div>

									<p className="text-muted-foreground text-sm">{state}</p>
								</div>
								<TextEditor isPublished={problem.status === 'public'} />
							</div>
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
