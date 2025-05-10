import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {TestcaseType} from "@/types";
import {Plus, Save, X} from "lucide-react";

type Props = {
	listTestcase: (TestcaseType & {index: number})[];
	selectedIndex: number;
	setSelectedIndex: (index: number) => void;
	selectedTestcase: TestcaseType;
	addTestcase: () => void;
	deleteTestcase: (index: number) => void;
	saveTestcase: () => void;
	updateInputValue: (inputIndex: number, newValue: string) => void;
};

export default function ListTestcase({
	listTestcase,
	selectedIndex,
	setSelectedIndex,
	selectedTestcase,
	addTestcase,
	deleteTestcase,
	saveTestcase,
	updateInputValue,
}: Props) {
	return (
		<div className="p-4">
			{/* Testcase buttons */}
			<div className="flex items-end gap-4 flex-wrap mb-4">
				<div className="flex flex-1 gap-3 flex-wrap">
					{listTestcase.length > 0 &&
						listTestcase.map((testcase, index) => (
							<div key={index} className="relative group">
								<Button
									onClick={() => setSelectedIndex(index)}
									className={cn(
										"px-3 py-2 pr-8",
										selectedIndex === index
											? "bg-zinc-200 text-zinc-900"
											: "bg-zinc-100 text-zinc-600 hover:bg-zinc-300",
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
					<Button className="bg-zinc-100 text-zinc-600 hover:bg-zinc-300" onClick={addTestcase}>
						<Plus />
					</Button>
				</div>
				<Button className="bg-zinc-100 text-zinc-600 hover:bg-zinc-300" onClick={saveTestcase}>
					<Save />
				</Button>
			</div>

			{/* Input fields */}
			<div className="flex flex-col gap-4 w-full">
				{selectedTestcase &&
					selectedTestcase.input.map((input, index) => (
						<div className="flex flex-col gap-1" key={`${input.name}-${index}`}>
							<span className="text-sm text-zinc-600 font-semibold ml-2">{input.name}</span>
							<Input value={input.value} onChange={e => updateInputValue(index, e.target.value)} />
						</div>
					))}
			</div>
		</div>
	);
}
