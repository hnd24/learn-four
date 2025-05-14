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
	source: "answer" | "user";
};

// Chạy code với testcase
const runCodeWithTestcases = async ({
	code,
	language_id = 63,
	testcase,
	nameFn = "main",
	source = "user",
}: {
	code: string;
	language_id?: number;
	testcase: Testcase[];
	nameFn?: string;
	source?: "answer" | "user";
}): Promise<RunResult[]> => {
	return await Promise.all(
		testcase.map(async test => {
			const inputValues = test.input.map(i => i.value).join("\n");

			const readInput = `
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8').split('\\n');
${test.input.map((item, idx) => `const ${item.name} = JSON.parse(input[${idx}]);`).join("\n")}
`;

			const fullCode = `${readInput}\n\n${code}\n\nconsole.log(${nameFn}(${test.input
				.map(item => item.name)
				.join(", ")}));`;

			try {
				const res = await axios.post(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
					source_code: fullCode,
					language_id,
					stdin: inputValues,
				});

				const output = res.data.stdout?.trim() ?? "";
				const stderr = res.data.stderr?.trim();
				const time = res.data.time;
				const isAccepted = output === test.except;

				return {
					input: inputValues,
					output,
					except: test.except,
					status: stderr ? "error" : isAccepted ? "accepted" : "rejected",
					stderr,
					time,
					source,
				};
			} catch {
				return {
					input: inputValues,
					output: "",
					except: test.except,
					status: "error",
					stderr: "Submission failed",
					source,
				};
			}
		}),
	);
};

// ✅ Code mẫu chuẩn (dataAnswer)
const dataAnswer = {
	nameFn: "sumArrays",
	code: `function sumArrays(num1, num2) {
	let sum = 0;
	for (let i = 0; i < num1.length; i++) sum += num1[i];
	for (let i = 0; i < num2.length; i++) sum += num2[i];
	return sum;
}`,
	testcase: [
		{
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
			],
			except: "10",
		},
	],
};

// ✅ Code người dùng (data)
const data = {
	nameFn: "sumArrays",
	code: `function sumArrays(num1, num2) {
	let sum = 0;
	for (let i = 0; i < num1.length; i++) sum += num1[i];
	for (let i = 0; i < num2.length; i++) sum += num2[i];
	return sum;
}`,
	testcase: [
		{
			input: [
				{name: "num1", value: "[1, 2]"},
				{name: "num2", value: "[3, 4]"},
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
	],
};

export default function TestC() {
	const [results, setResults] = useState<RunResult[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleClick = async () => {
		setLoading(true);
		setError(null);
		setResults(null);

		// Bước 1: kiểm tra testcase người dùng có đúng không
		const validate = await runCodeWithTestcases({
			code: dataAnswer.code,
			testcase: data.testcase,
			nameFn: dataAnswer.nameFn,
			source: "user",
		});

		const invalids = validate.filter(r => r.status !== "accepted");
		if (invalids.length > 0) {
			setError("❌ Một số testcase bạn nhập không hợp lệ:");
			setResults(invalids);
			setLoading(false);
			return;
		}

		// Bước 2: chạy lại toàn bộ testcase (cả user và official)
		const [official, user] = await Promise.all([
			runCodeWithTestcases({
				code: data.code,
				testcase: dataAnswer.testcase,
				nameFn: data.nameFn,
				source: "answer",
			}),
			runCodeWithTestcases({
				code: data.code,
				testcase: data.testcase,
				nameFn: data.nameFn,
				source: "user",
			}),
		]);

		setResults([...official, ...user]);
		setLoading(false);
	};

	return (
		<div className="p-4 space-y-4">
			<Button onClick={handleClick} disabled={loading}>
				{loading ? "Running..." : "Run Testcases"}
			</Button>

			{error && <p className="text-red-600 font-semibold">{error}</p>}

			{results && (
				<div className="space-y-6">
					{/* Official Testcases */}
					<div>
						<h2 className="text-lg font-bold text-gray-700 mb-2">🟢 Official Testcases</h2>
						<div className="space-y-4">
							{results
								.filter(r => r.source === "answer")
								.map((res, index) => (
									<TestResultCard key={`official-${index}`} index={index} res={res} />
								))}
						</div>
					</div>

					{/* User-defined Testcases */}
					<div>
						<h2 className="text-lg font-bold text-gray-700 mb-2">🧪 User-defined Testcases</h2>
						<div className="space-y-4">
							{results
								.filter(r => r.source === "user")
								.map((res, index) => (
									<TestResultCard key={`user-${index}`} index={index} res={res} />
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function TestResultCard({res, index}: {res: RunResult; index: number}) {
	return (
		<div className="border rounded p-3 bg-white shadow-sm space-y-1">
			<p className="font-semibold">Testcase {index + 1}</p>
			<p>
				<span className="font-medium text-gray-600">Input:</span>{" "}
				<pre className="bg-gray-100 rounded p-2 inline-block">{res.input}</pre>
			</p>
			<p>
				<span className="font-medium text-gray-600">Output:</span> <code>{res.output}</code>
			</p>
			<p>
				<span className="font-medium text-gray-600">Expected:</span> <code>{res.except}</code>
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
					<span className="font-medium text-gray-600">Runtime:</span> {res.time} sec
				</p>
			)}
			{res.stderr && <pre className="text-sm text-red-500 bg-red-50 p-2 rounded">{res.stderr}</pre>}
		</div>
	);
}
