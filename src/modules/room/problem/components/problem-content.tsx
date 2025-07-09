'use client';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import {ProblemDetailData} from '@/data';
import {useMediaQuery} from '@/hook/use-media-query';
import {ProblemDetailType} from '@/types';
import {useHydrateTemplate} from '../hook/use-hydrate-template';
import {useHydrateTestCases} from '../hook/use-hydrate-testcases';
import {useProblemId} from '../hook/use-problem-id';
import CodeArea from './code-area/code-area';

type Props = {
	preloadedProblem: ProblemDetailType;
};

export default function ProblemContent({preloadedProblem}: Props) {
	// IMPORTANT
	// const problem = usePreloadedQuery(preloadedProblem);
	const problem = ProblemDetailData;
	const isMobile = useMediaQuery('(max-width: 767px)');
	const problemId = useProblemId();
	useHydrateTestCases(problemId);
	useHydrateTemplate(problemId);

	if (isMobile) {
		<div className="flex w-screen overflow-hidden">
			{/* TODO: TextEditor */}
			{/* <TextEditor /> */}
		</div>;
	}
	return (
		<div className="flex-1 overflow-hidden">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={50} minSize={30}>
					{/* TODO: TextEditor */}
					{/* <TextEditor/> */}
				</ResizablePanel>
				<ResizableHandle withHandle className="mx-2" />
				<ResizablePanel defaultSize={50} minSize={30}>
					<CodeArea isPrivate={problem.status === 'private'} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
