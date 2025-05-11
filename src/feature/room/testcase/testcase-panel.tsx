"use client";

import {ScrollArea} from "@/components/ui/scroll-area";
import {useGetUserLesson} from "@/data/lesson";
import {cn} from "@/lib/utils";
import {SquareCheckBig, Terminal} from "lucide-react";
import {useEffect, useState} from "react";
import {useRoom} from "../provider";
import ListTestcase from "./components/list-testcase";
import ResultTestcase from "./components/result-testcase";
import SkeletonListTestcase from "./components/skeleton-list-testcase";

enum TypePanel {
	TESTCASE = "Testcase",
	RESULT = "Test result",
}

export default function TestcasePanel() {
	const {
		lessonDetail,
		tempTestcases,
		setTempTestcases,
		selectedIndex,
		setSelectedTestcase,
		selectedTestcase,
	} = useRoom();
	const {loading} = useGetUserLesson();

	const [typePanel, setTypePanel] = useState<TypePanel>(TypePanel.TESTCASE);

	useEffect(() => {
		if (tempTestcases && tempTestcases.length > 0) {
			setSelectedTestcase(tempTestcases[selectedIndex]);
		}
	}, [tempTestcases, selectedIndex]);

	useEffect(() => {
		if (lessonDetail && lessonDetail.testcase) {
			const initialData = lessonDetail.testcase;
			const withIndex = initialData.map((item, index) => ({...item, index}));
			setTempTestcases(withIndex);
		}
	}, [lessonDetail]);

	return (
		<div className="w-full h-full flex flex-col">
			{/* Tabs */}
			<div className="flex items-center border-b bg-zinc-200">
				{[TypePanel.TESTCASE, TypePanel.RESULT].map(panel => (
					<button
						key={panel}
						onClick={() => setTypePanel(panel)}
						className={cn(
							"h-full px-4 py-2 flex gap-1 bg-zinc-200 hover:bg-zinc-300 cursor-pointer",
							typePanel === panel && "bg-zinc-300",
						)}>
						{panel === TypePanel.TESTCASE ? (
							<SquareCheckBig className="w-5 h-5 text-leafyGreen" />
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
					selectedTestcase &&
					(loading ? <SkeletonListTestcase /> : <ListTestcase />)}
				{typePanel === TypePanel.RESULT && <ResultTestcase />}
			</ScrollArea>
		</div>
	);
}
