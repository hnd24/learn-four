"use client";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useIsMobile} from "@/hook/use-mobile";
import {cn} from "@/lib/utils";
import EditorPanel from "../editor-panel/editor-panel";
import {DashboardProvider} from "../provider";

type Props = {
	id: string;
};

export default function ContentRoom({id}: Props) {
	const isMobile = useIsMobile();
	return (
		<DashboardProvider>
			<ResizablePanelGroup direction="horizontal" className="w-full  ">
				<ResizablePanel
					defaultSize={isMobile ? 100 : 30}
					className="h-[calc(100vh-110px)] rounded-lg border border-charcoal lg:mr-0.5 ">
					<div>
						<span className="font-semibold">One</span>
					</div>
				</ResizablePanel>
				<ResizableHandle
					className={cn(isMobile && "hidden", "bg-transparent hover:bg-pulseBlue ")}
				/>
				<ResizablePanel defaultSize={70} className={cn(isMobile && "hidden", "ml-0.5 ")}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={50} className="rounded-lg border border-charcoal mb-0.5">
							<EditorPanel />
						</ResizablePanel>
						<ResizableHandle className="bg-transparent hover:bg-pulseBlue" />
						<ResizablePanel defaultSize={50} className="rounded-lg border border-charcoal mt-0.5">
							<div className="flex h-full items-center justify-center p-6">
								<span className="font-semibold">Three</span>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</DashboardProvider>
	);
}
