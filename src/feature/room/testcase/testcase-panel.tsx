"use client";

import {ScrollArea} from "@/components/ui/scroll-area";
import {useGetLessonById} from "@/data/lesson";
import {cn} from "@/lib/utils";
import {LessonDetailType, RunCode} from "@/types";
import {Loader2, SquareCheckBig, Terminal} from "lucide-react";
import {useEffect, useState} from "react";
import {useRoom} from "../provider";
import ListTestcase from "./components/list-testcase";
import ResultTestcase from "./components/result-testcase";
import SkeletonListTestcase from "./components/skeleton-list-testcase";
import SkeletonResultTestcase from "./components/skeleton-result-testcase";

enum TypePanel {
	TESTCASE = "Testcase",
	RESULT = "Test result",
}

type Props = {
	idLesson: string;
};

export default function TestcasePanel({idLesson}: Props) {
	const {setTempTestcases, runCode} = useRoom();
	const {loading, getLessonById} = useGetLessonById();
	const [lessonDetail, setLessonDetail] = useState<LessonDetailType | null>(null);
	useEffect(() => {
		const fetchLesson = async () => {
			const data = await getLessonById(idLesson);
			setLessonDetail(data);
		};
		fetchLesson();
	}, [getLessonById, idLesson]);

	const [typePanel, setTypePanel] = useState<TypePanel>(TypePanel.TESTCASE);

	useEffect(() => {
		if (lessonDetail && lessonDetail.testcaseSample) {
			const initialData = lessonDetail.testcaseSample;
			const withIndex = initialData.map((item, index) => ({...item, index}));
			setTempTestcases(withIndex);
		}
	}, [lessonDetail]);

	useEffect(() => {
		if (runCode === RunCode.Success) {
			setTypePanel(TypePanel.RESULT);
		}
	}, [runCode]);

	return (
		<div className="w-full h-full flex flex-col">
			{/* Tabs */}
			<div className="flex items-center border-b bg-zinc-200">
				{[TypePanel.TESTCASE, TypePanel.RESULT].map(panel => (
					<button
						disabled={loading}
						key={panel}
						onClick={() => {
							setTypePanel(panel);
						}}
						className={cn(
							"h-full px-4 py-2 flex gap-1 bg-zinc-200 hover:bg-zinc-300 cursor-pointer",
							typePanel === panel && "bg-zinc-300",
						)}>
						{panel === TypePanel.TESTCASE ? (
							<SquareCheckBig className="w-5 h-5 text-leafyGreen" />
						) : runCode === RunCode.Running ? (
							<Loader2 className="size-5 text-leafyGreen animate-spin" />
						) : (
							<Terminal className="w-5 h-5 text-leafyGreen" />
						)}
						<span className="text-sm font-medium w-fit truncate text-zinc-800">{panel}</span>
					</button>
				))}
			</div>

			{/* Content */}
			<ScrollArea className="flex-1 w-full h-full overflow-auto">
				{typePanel === TypePanel.TESTCASE &&
					(loading ? <SkeletonListTestcase /> : <ListTestcase />)}
				{typePanel === TypePanel.RESULT &&
					// loading execute code
					(false ? <SkeletonResultTestcase /> : <ResultTestcase />)}
			</ScrollArea>
		</div>
	);
}
