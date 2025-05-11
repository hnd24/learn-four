"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {TestcaseType} from "@/types";
import {Plus, Save, X} from "lucide-react";
import {toast} from "sonner";

type Props = {
	listTestcase: (TestcaseType & {index: number})[];
	selectedIndex: number;
	selectedTestcase: TestcaseType;
	setSelectedIndex: (index: number) => void;
	setListTestcase: (testcases: (TestcaseType & {index: number})[]) => void;
};

export default function ListTestcase({
	listTestcase,
	selectedIndex,
	selectedTestcase,
	setSelectedIndex,
	setListTestcase,
}: Props) {
	const updateInputValue = (inputIndex: number, newValue: string) => {
		if (!listTestcase[selectedIndex]) return;

		const updated = [...listTestcase];
		const current = updated[selectedIndex];

		updated[selectedIndex] = {
			...current,
			input: current.input.map((item, idx) =>
				idx === inputIndex ? {...item, value: newValue} : item,
			),
		};

		setListTestcase(updated);
	};

	const addTestcase = () => {
		const base = selectedTestcase || listTestcase[0];
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
		<div className="p-4 ">
			{/* Testcase buttons */}
			<div className="flex items-end gap-4 mb-2">
				<div className="flex flex-1 gap-3 flex-wrap">
					{listTestcase.map((_, index) => (
						<div key={index} className="relative group">
							<Button
								onClick={() => setSelectedIndex(index)}
								className={cn(
									"px-3 py-2 hover:bg-zinc-300 pr-8",
									selectedIndex === index
										? "bg-zinc-300 text-zinc-900"
										: "bg-zinc-200 text-zinc-600 hover:bg-zinc-300",
								)}>
								Test {index + 1}
							</Button>
							<X
								className="absolute top-1.5 right-1 size-4 p-0.5 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-zinc-200 text-zinc-600 hover:text-red-500 transition"
								onClick={e => {
									e.stopPropagation();
									deleteTestcase(index);
								}}
							/>
						</div>
					))}
					<Button className="bg-zinc-200 text-zinc-600 hover:bg-zinc-300" onClick={addTestcase}>
						<Plus />
					</Button>
				</div>
				<Button className="bg-zinc-200 text-zinc-600 hover:bg-zinc-300" onClick={saveTestcase}>
					<Save />
				</Button>
			</div>

			{/* Input fields */}
			<div className="flex flex-col gap-4 w-full">
				{selectedTestcase?.input.map((input, index) => (
					<div className="flex flex-col gap-1" key={`${input.name}-${index}`}>
						<span className="text-sm text-zinc-600 font-semibold ml-2">{input.name}</span>
						<Input value={input.value} onChange={e => updateInputValue(index, e.target.value)} />
					</div>
				))}
			</div>
		</div>
	);
}
