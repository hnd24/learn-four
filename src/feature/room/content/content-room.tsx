"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useIsMobile} from "@/hook/use-mobile";
import {cn} from "@/lib/utils";
import DescriptionPanel from "../description/description-panel";
import EditorPanel from "../editor-panel/editor-panel";
import {DashboardProvider} from "../provider";
import TestcasePanel from "../testcase/testcase-panel";

type Props = {
	id: string;
};

export default function ContentRoom({id}: Props) {
	const isMobile = useIsMobile();

	return (
		<DashboardProvider>
			<ResizablePanelGroup direction="horizontal" className="w-full">
				<ResizablePanel
					defaultSize={isMobile ? 100 : 30}
					className="h-[calc(100vh-98px)] rounded-lg border border-charcoal lg:mr-0.5 shadow-lg">
					{/* Description Panel  */}
					<DescriptionPanel idLesson={id} />
				</ResizablePanel>
				<ResizableHandle
					className={cn(isMobile && "hidden", "bg-transparent hover:bg-pulseBlue")}
				/>
				<ResizablePanel defaultSize={70} className={cn(isMobile && "hidden", "ml-0.5")}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel
							defaultSize={50}
							className="rounded-lg border border-charcoal mb-0.5 shadow-lg">
							{/* Editor Panel */}
							<EditorPanel idLesson={id} />
						</ResizablePanel>
						<ResizableHandle className="bg-transparent hover:bg-pulseBlue" />
						<ResizablePanel
							defaultSize={50}
							className="rounded-lg border border-charcoal mt-0.5 shadow-lg">
							{/* Testcase Panel */}
							<TestcasePanel />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</DashboardProvider>
	);
}
