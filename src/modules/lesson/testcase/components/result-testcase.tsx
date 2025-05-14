"use client";

import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {RunCode, RunResultStatus, TestCaseOutputType} from "@/types";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useRoom} from "../../provider";

export default function ResultTestcase() {
	const {runCode, resultTestcase} = useRoom();

	const [testcases, setTestcases] = useState<TestCaseOutputType[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	useEffect(() => {
		if (resultTestcase && resultTestcase?.testcase?.length > 0) {
			setTestcases(resultTestcase.testcase);
			setSelectedIndex(0);
		}
	}, [resultTestcase]);

	const selectedTestcase = testcases[selectedIndex];
	const numberPassed = testcases.filter(t => t.status === RunResultStatus.ACCEPTED).length;

	const overallStatus = resultTestcase?.status ?? "";

	const iconStatus = (status: RunResultStatus) => {
		switch (status) {
			case RunResultStatus.ACCEPTED:
				return <span className="bg-leafyGreen size-2 rounded-full" />;
			case RunResultStatus.REJECTED:
				return <span className="bg-tomatoRed size-2 rounded-full" />;
			case RunResultStatus.ERROR:
				return <span className="bg-yellow-500 size-2 rounded-full" />;
			default:
				return null;
		}
	};

	if (runCode === RunCode.None) {
		return (
			<div className="w-full p-4 flex justify-center">
				<span className="text-zinc-400 font-semibold">You must run your code.</span>
			</div>
		);
	}
	// if (runCode === RunCode.Error) {
	// 	return (
	// 		<div className="w-full p-4 flex justify-center">
	// 			{toast.error("Failed to execute code", {
	// 				duration: 1200,
	// 				style: {color: "#f44336"},
	// 			})}
	// 			<span className="text-tomatoRed font-semibold">Something went wrong..</span>
	// 		</div>
	// 	);
	// }

	if (runCode === RunCode.Running) {
		return (
			<div className="w-full p-4 flex justify-center">
				<span className="text-zinc-600 font-semibold">Running...</span>
			</div>
		);
	}

	return (
		<div className="w-full p-4 flex flex-col gap-4">
			<div className="flex items-end gap-2">
				<span
					className={cn(
						"text-xl font-semibold leading-5",
						overallStatus === RunResultStatus.ACCEPTED
							? "text-leafyGreen"
							: overallStatus === RunResultStatus.REJECTED
								? "text-tomatoRed"
								: "text-yellow-500",
					)}>
					{overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
				</span>
				<span className="text-sm font-semibold leading-3.5 text-zinc-400">
					Runtime: {selectedTestcase?.runTime ?? "-"} sec
				</span>
			</div>

			<span className="text-zinc-400">
				Testcase passed: {numberPassed} / {testcases.length}
			</span>

			{/* List testcase */}
			<div className="flex gap-3 flex-wrap">
				{testcases.map((t, index) => (
					<button
						key={index}
						onClick={() => setSelectedIndex(index)}
						className={cn(
							"rounded-lg flex gap-2 items-center px-3 py-1 hover:bg-zinc-300",
							selectedIndex === index ? "bg-zinc-300 text-zinc-900" : "bg-zinc-200 text-zinc-600",
						)}>
						{iconStatus(t.status)}
						<span className="whitespace-nowrap">Test {index + 1}</span>
					</button>
				))}
			</div>

			{/* Detail testcase */}
			{selectedTestcase && (
				<div
					className={cn(
						"flex flex-col gap-4 w-full",
						selectedTestcase.status === RunResultStatus.ACCEPTED
							? "text-leafyGreen"
							: selectedTestcase.status === RunResultStatus.REJECTED
								? "text-tomatoRed"
								: "text-yellow-500",
					)}>
					<div className="flex flex-col gap-1">
						<div className="flex items-center">
							{iconStatus(selectedTestcase.status)}
							<span className="text-sm font-semibold ml-2">Expected</span>
						</div>
						<Input value={selectedTestcase.except ?? ""} disabled className="font-semibold" />
					</div>

					<div className="flex flex-col gap-1">
						<div className="flex items-center">
							{iconStatus(selectedTestcase.status)}
							<span className="text-sm font-semibold ml-2">Output</span>
						</div>
						<Input value={selectedTestcase.output ?? ""} disabled className="font-semibold" />
					</div>

					{selectedTestcase.input.map((input, index) => (
						<div className="flex flex-col gap-1 text-zinc-500" key={`${input.name}-${index}`}>
							<span className="text-sm font-semibold ml-2">{input.name}</span>
							<Input value={input.value ?? ""} disabled className="font-semibold" />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
