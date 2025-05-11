"use client";

import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {TestcaseType} from "@/types";
import {SquareCheckBig, Terminal} from "lucide-react";
import {useEffect, useState} from "react";
import ListTestcase from "./components/list-testcase";
import SkeletonListTestcase from "./components/skeleton-list-testcase";

enum TypePanel {
	TESTCASE = "Testcase",
	RESULT = "Test result",
}

type Props = {
	testcase: TestcaseType[];
	loading: boolean;
};
export default function TestcasePanel({testcase = [], loading = false}: Props) {
	const [listTestcase, setListTestcase] = useState<(TestcaseType & {index: number})[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [typePanel, setTypePanel] = useState<TypePanel>(TypePanel.TESTCASE);

	const selectedTestcase = listTestcase[selectedIndex];

	useEffect(() => {
		if (testcase && testcase.length > 0) {
			const initialData = testcase;
			const withIndex = initialData.map((item, index) => ({...item, index}));
			setListTestcase(withIndex);
		}
	}, [testcase]);

	return (
		<div className="w-full h-full flex flex-col">
			{/* Tabs */}
			<div className="flex items-center border-b bg-zinc-100">
				{[TypePanel.TESTCASE, TypePanel.RESULT].map(panel => (
					<button
						key={panel}
						onClick={() => setTypePanel(panel)}
						className={cn(
							"h-full px-4 py-2 flex gap-1 bg-zinc-200 hover:bg-zinc-300 cursor-pointer",
							typePanel === panel && "bg-zinc-300",
						)}>
						{panel === TypePanel.TESTCASE ? (
							<SquareCheckBig className="w-5 h-5 text-zinc-600" />
						) : (
							<Terminal className="w-5 h-5 text-zinc-600" />
						)}
						<span className="text-sm font-medium w-fit truncate text-zinc-800">{panel}</span>
					</button>
				))}
			</div>

			{/* Content */}
			<ScrollArea className="flex-1 w-full overflow-auto">
				{typePanel === TypePanel.TESTCASE &&
					selectedTestcase &&
					(loading ? (
						<SkeletonListTestcase />
					) : (
						<ListTestcase
							listTestcase={listTestcase}
							selectedIndex={selectedIndex}
							selectedTestcase={selectedTestcase}
							setSelectedIndex={setSelectedIndex}
							setListTestcase={setListTestcase}
						/>
					))}
				{typePanel === TypePanel.RESULT && <></>}
			</ScrollArea>
		</div>
	);
}
