"use client";

import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {
	ExecutedTestcaseStatusType,
	ExecuteTestcaseType,
	RunCode,
	TestCaseOutputType,
} from "@/types";
import {useEffect, useState} from "react";
import {useRoom} from "../../provider";

const ExecuteTestcaseData: ExecuteTestcaseType = {
	testcase: [
		{
			runTime: 0.023,
			index: 0,
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
			],
			except: "10",
			output: "10",
			status: ExecutedTestcaseStatusType.ACCEPTED,
		},
		{
			runTime: 0.12,
			index: 1,
			input: [
				{name: "num1", value: "[10]"},
				{name: "num2", value: "[5, 5]"},
			],
			except: "20",
			output: "20",
			status: ExecutedTestcaseStatusType.REJECTED,
		},
		{
			runTime: 0.042,
			index: 2,
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
			],
			except: "10",
			output: "undefined",
			status: ExecutedTestcaseStatusType.ERROR,
		},
	],
	status: ExecutedTestcaseStatusType.ERROR,
};

export default function ResultTestcase() {
	const {runCode} = useRoom();

	const [testcases, setTestcases] = useState<TestCaseOutputType[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	useEffect(() => {
		if (ExecuteTestcaseData?.testcase?.length > 0) {
			setTestcases(ExecuteTestcaseData.testcase);
			setSelectedIndex(0);
		}
	}, []);

	const selectedTestcase = testcases[selectedIndex];
	const numberPassed = testcases.filter(
		t => t.status === ExecutedTestcaseStatusType.ACCEPTED,
	).length;

	const overallStatus = ExecuteTestcaseData.status;

	const iconStatus = (status: ExecutedTestcaseStatusType) => {
		switch (status) {
			case ExecutedTestcaseStatusType.ACCEPTED:
				return <span className="bg-leafyGreen size-2 rounded-full" />;
			case ExecutedTestcaseStatusType.REJECTED:
				return <span className="bg-tomatoRed size-2 rounded-full" />;
			case ExecutedTestcaseStatusType.ERROR:
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
						overallStatus === ExecutedTestcaseStatusType.ACCEPTED
							? "text-leafyGreen"
							: overallStatus === ExecutedTestcaseStatusType.REJECTED
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
						selectedTestcase.status === ExecutedTestcaseStatusType.ACCEPTED
							? "text-leafyGreen"
							: selectedTestcase.status === ExecutedTestcaseStatusType.REJECTED
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
