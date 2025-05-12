"use client";

import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {ExecutedTestcaseStatusType, ExecuteTestcaseType, RunCode, TestcaseType} from "@/types";
import {useEffect, useState} from "react";
import {useRoom} from "../../provider";

type Props = {};

const ExecuteTestcaseData: ExecuteTestcaseType = {
	runTime: 2000,
	testcase: [
		{
			index: 0,
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
				{name: "num3", value: "[5, 6]"},
				{name: "num4", value: "[7, 8]"},
				{name: "num5", value: "[9, 10]"},
				{name: "num6", value: "[11, 12]"},
				{name: "num7", value: "[13, 14]"},
			],
			except: "10",
			output: "10",
			status: "accepted" as ExecutedTestcaseStatusType,
			isHidden: false,
		},
		{
			index: 1,
			input: [
				{name: "num1", value: "[10]"},
				{name: "num2", value: "[5, 5]"},
			],
			except: "20",
			output: "20",
			status: "rejected" as ExecutedTestcaseStatusType,
			isHidden: true,
		},
		{
			index: 2,
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
				{name: "num3", value: "[5, 6]"},
				{name: "num4", value: "[7, 8]"},
				{name: "num5", value: "[9, 10]"},
				{name: "num6", value: "[11, 12]"},
				{name: "num7", value: "[13, 14]"},
			],
			except: "10",
			output: "10",
			status: "rejected" as ExecutedTestcaseStatusType,
			isHidden: false,
		},
	],
	status: "accepted" as ExecutedTestcaseStatusType,
};

export default function ResultTestcase({}: Props) {
	const {runCode} = useRoom();

	const [testcase, setTestcase] = useState<
		(TestcaseType & {
			index: number;
			status: ExecutedTestcaseStatusType;
			output: string;
			except?: string;
		})[]
	>([]);
	const [runTime, setRunTime] = useState<number>(0);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		if (ExecuteTestcaseData?.testcase?.length > 0) {
			setSelectedIndex(0);
		}
	}, []);
	useEffect(() => {
		if (ExecuteTestcaseData) {
			setTestcase(ExecuteTestcaseData.testcase);
			setRunTime(ExecuteTestcaseData.runTime ?? 0);
		}
	}, [ExecuteTestcaseData]);

	const selectedTestcase = testcase[selectedIndex];
	const numberPassed = testcase.filter(
		t => t.status === ExecutedTestcaseStatusType.ACCEPTED,
	).length;

	const iconStatus = (status: ExecutedTestcaseStatusType) => {
		switch (status) {
			case ExecutedTestcaseStatusType.ACCEPTED:
				return <span className="bg-leafyGreen size-2 rounded-full" />;
			case ExecutedTestcaseStatusType.REJECTED:
				return <span className="bg-tomatoRed size-2 rounded-full" />;
			default:
				return null;
		}
	};

	return (
		<div className="w-full p-4">
			{runCode === RunCode.None && (
				<span className="text-zinc-400 font-semibold">You must run your code.</span>
			)}

			{runCode === RunCode.Running && (
				<span className="text-zinc-600 font-semibold">Loading...</span>
			)}

			{(runCode === RunCode.Success || runCode === RunCode.Error) && (
				<div className="w-full flex flex-col gap-4">
					<div className="flex items-end gap-2">
						<span
							className={cn(
								"w-fit truncate text-xl font-semibold leading-5",
								ExecuteTestcaseData.status === ExecutedTestcaseStatusType.ACCEPTED
									? "text-leafyGreen"
									: "text-tomatoRed",
							)}>
							{ExecuteTestcaseData.status.charAt(0).toUpperCase() +
								ExecuteTestcaseData.status.slice(1)}
						</span>
						<span className="w-fit truncate text-sm font-semibold leading-4 text-zinc-400">
							Runtime: {runTime} ms
						</span>
					</div>

					<span className="text-zinc-400">
						Testcase passed: {numberPassed} / {testcase.length}
					</span>

					<div className="flex gap-3 flex-wrap">
						{testcase
							.filter(t => !t.isHidden)
							.map((t, index) => (
								<button
									key={index}
									onClick={() => setSelectedIndex(index)}
									className={cn(
										"rounded-lg flex gap-2 items-center px-3 py-1 hover:bg-zinc-300",
										selectedIndex === index
											? "bg-zinc-300 text-zinc-900"
											: "bg-zinc-200 text-zinc-600",
									)}>
									{iconStatus(t.status)}
									<span className="whitespace-nowrap">Test {index + 1}</span>
								</button>
							))}
					</div>

					<div className="flex flex-col gap-4 w-full">
						<div
							className={cn(
								"flex flex-col gap-4 w-full",
								selectedTestcase?.status === ExecutedTestcaseStatusType.ACCEPTED
									? "text-leafyGreen"
									: "text-tomatoRed",
							)}>
							<div className="flex flex-col gap-1">
								<div className="flex items-center">
									{iconStatus(selectedTestcase?.status)}
									<span className="text-sm font-semibold ml-2">Except</span>
								</div>
								<Input value={selectedTestcase?.except ?? ""} disabled />
							</div>
							<div className="flex flex-col gap-1">
								<div className="flex items-center">
									{iconStatus(selectedTestcase?.status)}
									<span className="text-sm font-semibold ml-2">Output</span>
								</div>
								<Input value={selectedTestcase?.output ?? ""} disabled />
							</div>
						</div>

						{selectedTestcase?.input.map((input, index) => (
							<div className="flex flex-col gap-1" key={`${input.name}-${index}`}>
								<span className="text-sm text-zinc-400 font-semibold ml-2">{input.name}</span>
								<Input value={input.value ?? ""} disabled />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
