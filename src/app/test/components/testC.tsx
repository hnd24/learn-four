"use client";

import {Button} from "@/components/ui/button";
import axios from "axios";
import {useState} from "react";

const JUDGE0_URL = "http://localhost:2358";

type Testcase = {
	input: {name: string; value: string}[];
	except: string;
};

type RunResult = {
	input: string;
	output: string;
	except: string;
	status: "accepted" | "rejected" | "error";
	stderr?: string;
	time?: string;
};

const runCodeWithTestcases = async ({
	code,
	language_id = 63,
	testcase,
}: {
	code: string;
	language_id?: number;
	testcase: Testcase[];
}): Promise<RunResult[]> => {
	const results: RunResult[] = [];

	for (const test of testcase) {
		const inputValues = test.input.map(i => i.value).join("\n");

		try {
			const res = await axios.post(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
				source_code: code,
				language_id,
				stdin: inputValues,
			});

			const output = res.data.stdout?.trim() ?? "";
			const stderr = res.data.stderr?.trim();
			const time = res.data.time;

			const isAccepted = output === test.except;

			results.push({
				input: inputValues,
				output,
				except: test.except,
				status: stderr ? "error" : isAccepted ? "accepted" : "rejected",
				stderr,
				time,
			});
		} catch (err) {
			results.push({
				input: inputValues,
				output: "",
				except: test.except,
				status: "error",
				stderr: "Submission failed",
			});
		}
	}

	return results;
};

export default function TestC() {
	const [results, setResults] = useState<RunResult[] | null>(null);
	const [loading, setLoading] = useState(false);

	const data = {
		code: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8').split('\\n');
const num1 = JSON.parse(input[0]);
const num2 = JSON.parse(input[1]);

function sumArrays(num1, num2) {
  let sum = 0;
  for (let i = 0; i < num1.length; i++) {
    sum += num1[i];
  }
  for (let i = 0; i < num2.length; i++) {
    sum += num2[i];
  }
  return sum;
}

console.log(sumArrays(num1, num2));`,
		testcase: [
			{
				input: [
					{name: "num1", value: "[1, 2]"},
					{name: "num2", value: "4]"},
				],
				except: "10",
			},
			{
				input: [
					{name: "num1", value: "[5]"},
					{name: "num2", value: "[5]"},
				],
				except: "10",
			},
			{
				input: [
					{name: "num1", value: "[2, 2]"},
					{name: "num2", value: "[3, 3]"},
				],
				except: "11",
			},
		],
	};

	const handleClick = async () => {
		setLoading(true);
		const result = await runCodeWithTestcases(data);
		setResults(result);
		setLoading(false);
	};

	return (
		<div className="p-4 space-y-4">
			<Button onClick={handleClick} disabled={loading}>
				{loading ? "Running..." : "Run Testcases"}
			</Button>

			{results && (
				<div className="space-y-4">
					{results.map((res, index) => (
						<div key={index} className="border rounded p-3 space-y-1 bg-white shadow-sm">
							<p className="font-semibold">Testcase {index + 1}</p>
							<div>
								<span className="font-medium text-gray-600">Input:</span>{" "}
								<pre className="bg-gray-100 rounded p-2 inline-block">{res.input}</pre>
							</div>
							<p>
								<span className="font-medium text-gray-600">Output:</span> <code>{res.output}</code>
							</p>
							<p>
								<span className="font-medium text-gray-600">Expected:</span>{" "}
								<code>{res.except}</code>
							</p>
							<p>
								<span className="font-medium text-gray-600">Status:</span>{" "}
								<span
									className={
										res.status === "accepted"
											? "text-green-600 font-bold"
											: res.status === "rejected"
												? "text-red-600 font-bold"
												: "text-yellow-600 font-bold"
									}>
									{res.status.toUpperCase()}
								</span>
							</p>
							{res.time && (
								<p>
									<span className="font-medium text-gray-600">Runtime:</span>{" "}
									<span>{res.time} sec</span>
								</p>
							)}
							{res.stderr && (
								<pre className="text-sm text-red-500 bg-red-50 p-2 rounded">{res.stderr}</pre>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
