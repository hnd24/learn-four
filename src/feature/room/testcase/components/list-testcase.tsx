"use client";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Plus, Save, X} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import {useRoom} from "../../provider";

export default function TempTestcases() {
	const {tempTestcases, setTempTestcases} = useRoom();
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const selectedTestcase = tempTestcases[selectedIndex];

	const updateInputValue = (inputIndex: number, newValue: string) => {
		if (!selectedTestcase) return;

		const updated = [...tempTestcases];
		const current = updated[selectedIndex];

		updated[selectedIndex] = {
			...current,
			input: current.input.map((item, idx) =>
				idx === inputIndex ? {...item, value: newValue} : item,
			),
		};

		setTempTestcases(updated);
	};

	const addTestcase = () => {
		const base = selectedTestcase || tempTestcases[0];
		const newTestcase = {
			...JSON.parse(JSON.stringify(base)),
			index: tempTestcases.length,
			isHidden: false,
		};
		setTempTestcases([...tempTestcases, newTestcase]);
		setSelectedIndex(tempTestcases.length);
	};

	const deleteTestcase = (index: number) => {
		if (tempTestcases.length === 1) {
			toast.error("Cannot delete the last testcase", {
				duration: 2000,
				position: "top-center",
				style: {color: "#f87171"},
			});
			return;
		}

		const updated = tempTestcases.filter((_, i) => i !== index);
		setTempTestcases(updated);

		if (selectedIndex >= updated.length) {
			setSelectedIndex(updated.length - 1);
		} else if (selectedIndex === index) {
			setSelectedIndex(0);
		}
	};

	const saveTestcase = () => {
		console.log("✅ Save Testcase:", tempTestcases);
		toast.success("Testcases saved!", {
			position: "top-center",
			style: {color: "#2baa48"},
		});
	};

	return (
		<div className="p-4">
			{/* Testcase buttons */}
			<div className="flex items-end gap-4 mb-2">
				<div className="flex flex-1 gap-3 flex-wrap">
					{tempTestcases
						.filter(testcase => !testcase.isHidden)
						.map((testcase, index) => {
							return (
								<div
									key={index}
									className={cn(
										"group rounded-lg flex overflow-hidden hover:bg-zinc-300",
										selectedIndex === index
											? "bg-zinc-300 text-zinc-900"
											: "bg-zinc-200 text-zinc-600",
									)}>
									<button className="px-3 py-1" onClick={() => setSelectedIndex(index)}>
										<span className="whitespace-nowrap">Test {index + 1}</span>
									</button>
									<Hint label="Delete Testcase">
										<button
											onClick={e => {
												e.stopPropagation();
												deleteTestcase(index);
											}}
											className="cursor-pointer transition px-1 hover:bg-zinc-200">
											<X className="size-4 opacity-0 group-hover:opacity-100 group-hover:text-red-500 text-zinc-600" />
										</button>
									</Hint>
								</div>
							);
						})}

					<Hint label="Add Testcase">
						<Button className="bg-zinc-200 text-zinc-600 hover:bg-zinc-300" onClick={addTestcase}>
							<Plus />
						</Button>
					</Hint>
				</div>

				<Hint label="Save Testcase">
					<Button className="bg-zinc-200 text-zinc-600 hover:bg-zinc-300" onClick={saveTestcase}>
						<Save />
					</Button>
				</Hint>
			</div>

			{/* Input fields */}
			<div className="flex flex-col gap-4 w-full">
				{selectedTestcase?.input.map((input, index) => (
					<div className="flex flex-col gap-1" key={`${input.name}-${index}`}>
						<span className="text-sm text-zinc-600 font-semibold ml-2">{input.name}</span>
						<Input
							value={input.value ?? ""}
							onChange={e => updateInputValue(index, e.target.value)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
