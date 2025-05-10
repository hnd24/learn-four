"use client";

import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {TestcaseType} from "@/types";
import {SquareCheckBig, Terminal} from "lucide-react";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import ListTestcase from "./components/list-testcase";

const initialData: TestcaseType[] = [
	{
		input: Array.from({length: 9}).map((_, i) => ({
			name: `num${i + 1}`,
			value: "[4, 5, 6]",
		})),
		output: "6",
	},
	{
		input: [
			{name: "num1", value: "[4, 5, 6]"},
			{name: "num2", value: "[1, 2, 3]"},
		],
		output: "15",
	},
];

enum TypePanel {
	TESTCASE = "Testcase",
	RESULT = "Test result",
}

export default function TestcasePanel() {
	const [listTestcase, setListTestcase] = useState<(TestcaseType & {index: number})[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [typePanel, setTypePanel] = useState<TypePanel>(TypePanel.TESTCASE);

	useEffect(() => {
		const withIndex = initialData.map((item, index) => ({...item, index}));
		setListTestcase(withIndex);
	}, []);

	const selectedTestcase = listTestcase[selectedIndex];

	const updateInputValue = (inputIndex: number, newValue: string) => {
		const updated = [...listTestcase];
		updated[selectedIndex] = {
			...selectedTestcase,
			input: selectedTestcase.input.map((item, idx) =>
				idx === inputIndex ? {...item, value: newValue} : item,
			),
		};
		setListTestcase(updated);
	};

	const addTestcase = () => {
		const base = selectedTestcase || initialData[0];
		const newTestcase = {
			...JSON.parse(JSON.stringify(base)),
			index: listTestcase.length,
		};
		setListTestcase([...listTestcase, newTestcase]);
		setSelectedIndex(listTestcase.length);
	};

	const deleteTestcase = (index: number) => {
		if (listTestcase.length === 1) {
			toast.error("Cannot delete the last testcase", {
				duration: 2000,
				position: "bottom-right",
				className: "bg-red-100 text-red-700 border border-red-300",
			});
			return;
		}

		const updated = listTestcase.filter((_, i) => i !== index);
		setListTestcase(updated);
		if (selectedIndex >= updated.length) {
			setSelectedIndex(updated.length - 1);
		} else if (selectedIndex === index) {
			setSelectedIndex(0);
		}
	};

	const saveTestcase = () => {
		console.log("✅ Save Testcase:", listTestcase);
		toast.success("Testcases saved!");
	};

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
						<span className="text-sm font-medium text-zinc-800">{panel}</span>
					</button>
				))}
			</div>

			{/* Content */}
			<ScrollArea className="flex-1 w-full overflow-auto">
				{typePanel === TypePanel.TESTCASE && (
					<ListTestcase
						listTestcase={listTestcase}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
						selectedTestcase={selectedTestcase}
						addTestcase={addTestcase}
						deleteTestcase={deleteTestcase}
						saveTestcase={saveTestcase}
						updateInputValue={updateInputValue}
					/>
				)}
			</ScrollArea>
		</div>
	);
}
