"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useGetLessonById} from "@/data/lesson";
import {useIsMobile} from "@/hook/use-mobile";
import {cn} from "@/lib/utils";
import {LessonDetailType} from "@/types";
import {useEffect, useState} from "react";
import DescriptionPanel from "../description/description-panel";
import EditorPanel from "../editor-panel/editor-panel";
import {DashboardProvider} from "../provider";
import TestcasePanel from "../testcase/testcase-panel";

type Props = {
	id: string;
};

export default function ContentRoom({id}: Props) {
	const isMobile = useIsMobile();
	const [lessonDetail, setLessonDetail] = useState<LessonDetailType | null>(null);
	const {getLessonById, loading} = useGetLessonById();

	useEffect(() => {
		const fetchLesson = async () => {
			const data = await getLessonById(id);
			setLessonDetail(data);
		};
		fetchLesson();
	}, [getLessonById, id]);

	return (
		<DashboardProvider>
			<ResizablePanelGroup direction="horizontal" className="w-full">
				<ResizablePanel
					defaultSize={isMobile ? 100 : 30}
					className="h-[calc(100vh-98px)] rounded-lg border border-charcoal lg:mr-0.5 shadow-lg">
					<DescriptionPanel />
				</ResizablePanel>
				<ResizableHandle
					className={cn(isMobile && "hidden", "bg-transparent hover:bg-pulseBlue")}
				/>
				<ResizablePanel defaultSize={70} className={cn(isMobile && "hidden", "ml-0.5")}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel
							defaultSize={50}
							className="rounded-lg border border-charcoal mb-0.5 shadow-lg">
							<EditorPanel />
						</ResizablePanel>
						<ResizableHandle className="bg-transparent hover:bg-pulseBlue" />
						<ResizablePanel
							defaultSize={50}
							className="rounded-lg border border-charcoal mt-0.5 shadow-lg">
							<TestcasePanel testcase={lessonDetail?.testcase ?? []} loading={loading} />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</DashboardProvider>
	);
}
