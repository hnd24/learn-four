"use client";

import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {RunCode} from "@/types";
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

export default function TestcasePanel() {
	const {runCode, loadingLesson: loading} = useRoom();
	const [typePanel, setTypePanel] = useState<TypePanel>(TypePanel.TESTCASE);

	// Tự động chuyển sang panel kết quả khi chạy xong
	useEffect(() => {
		if (runCode === RunCode.Success) {
			setTypePanel(TypePanel.RESULT);
		}
	}, [runCode]);

	return (
		<div className="w-full h-full flex flex-col">
			{/* Tabs */}
			<div className="flex items-center border-b bg-zinc-200 p-0.5">
				<button
					disabled={loading}
					onClick={() => setTypePanel(TypePanel.TESTCASE)}
					className={cn(
						"h-full px-3 py-2 rounded-l-lg flex gap-1 bg-zinc-200 hover:bg-zinc-300 cursor-pointer",
						typePanel === TypePanel.TESTCASE && "bg-zinc-300",
					)}>
					<SquareCheckBig className="w-5 h-5 text-leafyGreen" />
					<span className="text-sm font-medium w-fit truncate text-zinc-800">
						{TypePanel.TESTCASE}
					</span>
				</button>

				<button
					disabled={loading}
					onClick={() => setTypePanel(TypePanel.RESULT)}
					className={cn(
						"h-full px-3 py-2 rounded-r-lg flex gap-1 bg-zinc-200 hover:bg-zinc-300 cursor-pointer",
						typePanel === TypePanel.RESULT && "bg-zinc-300",
					)}>
					{runCode === RunCode.Running ? (
						<Loader2 className="size-5 text-leafyGreen animate-spin" />
					) : (
						<Terminal className="w-5 h-5 text-leafyGreen" />
					)}
					<span className="text-sm font-medium w-fit truncate text-zinc-800">
						{TypePanel.RESULT}
					</span>
				</button>
			</div>

			{/* Nội dung bên trong Panel */}
			<ScrollArea className="flex-1 w-full h-full overflow-auto">
				{typePanel === TypePanel.TESTCASE ? (
					loading ? (
						<SkeletonListTestcase />
					) : (
						<ListTestcase />
					)
				) : runCode === RunCode.Running ? (
					<SkeletonResultTestcase />
				) : (
					<ResultTestcase />
				)}
			</ScrollArea>
		</div>
	);
}
