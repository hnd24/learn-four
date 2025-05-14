"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useGetLessonById} from "@/data/lesson";
import {useIsMobile} from "@/hook/use-mobile";
import {cn} from "@/lib/utils";
import CostumeLoadingPage from "@/page/costume-loading-page";
import {LessonDetailType} from "@/types";
import {useEffect, useState} from "react";
import DescriptionPanel from "../description/description-panel";
import EditorPanel from "../editor-panel/editor-panel";
import {useRoom} from "../provider";
import TestcasePanel from "../testcase/testcase-panel";

type Props = {
	id: string;
};

export default function ContentRoom({id}: Props) {
	const isMobile = useIsMobile();
	const [data, setData] = useState<LessonDetailType | null>(null);
	const {language, setAnswerCode, setAnswerTestcase, setTempTestcases, setNameFn} = useRoom();
	const {getLessonById, loading} = useGetLessonById();

	useEffect(() => {
		const fetchLesson = async () => {
			const result = await getLessonById(id);
			setData(result);
		};
		fetchLesson();
	}, [getLessonById, id]);

	useEffect(() => {
		if (!data) return;

		// Set code theo ngôn ngữ
		const codeItem = data.answer.code.find(item => item.language === language);
		setAnswerCode(codeItem?.code || "");

		// Set testcase
		setAnswerTestcase(data.answer.testcase);

		// Set testcase sample
		const withIndex = data.testcaseSample.map((item, index) => ({
			...item,
			index,
		}));
		setTempTestcases(withIndex);

		// Set name function
		setNameFn(data.nameFn);
	}, [data, language]);

	if (loading || !data) return <CostumeLoadingPage />;

	return (
		<ResizablePanelGroup direction="horizontal" className="w-full">
			<ResizablePanel
				defaultSize={isMobile ? 100 : 30}
				className="h-[calc(100vh-98px)] rounded-lg border border-charcoal lg:mr-0.5 shadow-lg">
				<DescriptionPanel content={data.content} />
			</ResizablePanel>
			<ResizableHandle className={cn(isMobile && "hidden", "bg-transparent hover:bg-pulseBlue")} />
			<ResizablePanel defaultSize={70} className={cn(isMobile && "hidden", "ml-0.5")}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel
						defaultSize={50}
						className="rounded-lg border border-charcoal mb-0.5 shadow-lg">
						<EditorPanel idLesson={id} />
					</ResizablePanel>
					<ResizableHandle className="bg-transparent hover:bg-pulseBlue" />
					<ResizablePanel
						defaultSize={50}
						className="rounded-lg border border-charcoal mt-0.5 shadow-lg">
						<TestcasePanel />
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
