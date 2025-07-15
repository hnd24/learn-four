'use client';
import LoadingState from '@/components/loading-state';
import NotAccessState from '@/components/not-access';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {useMediaQuery} from '@/hook/use-media-query';
import CodeArea from '@/modules/room/problem/components/code-area';
import {useHydrateTemplate} from '@/modules/room/problem/hook/use-hydrate-template';
import {useHydrateTestCases} from '@/modules/room/problem/hook/use-hydrate-testcases';
import {useProblemId} from '@/modules/room/problem/hook/use-problem-id';
import {Preloaded, usePreloadedQuery} from 'convex/react';
import {api} from '../../../../../convex/_generated/api';

type Props = {
	preloadedProblem: Preloaded<typeof api.problems.getDetailProblemById>;
};

export default function ProblemContent({preloadedProblem}: Props) {
	const problem = usePreloadedQuery(preloadedProblem);
	const isMobile = useMediaQuery('(max-width: 767px)');
	const problemId = useProblemId();
	const isPending = false;
	useHydrateTestCases(problemId);
	useHydrateTemplate(problemId);

	if (problem?.status === 'private') {
		return <NotAccessState link="/problem" />;
	}

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
