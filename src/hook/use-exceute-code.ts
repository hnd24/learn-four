import {axiosClient} from "@/lib/axios";
import {ResultTestcaseType, RunResultStatus, TestcaseType} from "@/types";
import {useMutation} from "@tanstack/react-query";

// Hàm để chuẩn hóa kiểu khai báo biến cho từng ngôn ngữ
function getVarType(
	language_id: number,
	nameVar: string,
	baseType: string,
	isArray: boolean = false,
): string {
	if (baseType.toLowerCase() === "string") {
		switch (language_id) {
			case 54: // C++
				baseType = "string";
				break;
			default: // Java, C#
				baseType = "string";
		}
	}

	switch (language_id) {
		case 62: // Java
			return isArray ? `${baseType}[] ${nameVar}` : `${baseType} ${nameVar}`;

		case 51: // C#
			return isArray ? `${baseType}[] ${nameVar}` : `${baseType} ${nameVar}`;

		case 54: // C++
			return isArray ? `vector<${baseType}> ${nameVar}` : `${baseType} ${nameVar}`;

		default:
			return baseType;
	}
}

const getInputValue = (value: string): string => {
	return value.replace(/^\[/, "{").replace(/\]$/, "}");
};

// Hàm xử lý code cho từng ngôn ngữ
export const handleFullCode = (
	language_id: number,
	code: string,
	testcase: TestcaseType,
	nameFn: string,
	header: string,
) => {
	// JavaScript (Node.js)
	if (language_id === 63) {
		const readInput = `${testcase.input.map(item => `const ${item.name} = ${item.value}`).join(";\n")}`;
		const callFn = `console.log(${nameFn}(${testcase.input.map(i => i.name).join(", ")}));`;
		return `${header}\n${readInput}\n${code}\n${callFn}`;
	}

	// TypeScript
	if (language_id === 74) {
		const readInput = `${testcase.input.map((item, index) => `const ${item.name} = ${item.value}`).join(";\n")}`;
		const callFn = `console.log(${nameFn}(${testcase.input.map(i => i.name).join(", ")}));`;
		return `${header}\n${readInput}\n${code}\n${callFn}`;
	}

	// Python
	if (language_id === 71) {
		const readInput = `${testcase.input.map((item, idx) => `${item.name} = ${item.value}`).join("\n")}`;
		const callFn = `print(${nameFn}(${testcase.input.map(i => i.name).join(", ")}))`;
		return `${header}\n${readInput}\n${code}\n${callFn}`;
	}

	// Java
	if (language_id === 62) {
		return `${header}
	public class Main {
	static	${code}
	public static void main(String[] args) {
		${testcase.input
			.map(
				item =>
					`${getVarType(language_id, item.name, item.valueType, item.isArray)} = ${item.isArray ? getInputValue(item.value) : item.value};`,
			)
			.join("\n\t")}
  System.out.println(${nameFn}(${testcase.input.map(i => i.name).join(", ")}));
  }
}`;
	}

	// C++
	if (language_id === 54) {
		return `${header}
#include <iostream>
using namespace std;
${code}
int main() {
	${testcase.input
		.map(
			item =>
				`${getVarType(language_id, item.name, item.valueType, item.isArray)} = ${item.isArray ? getInputValue(item.value) : item.value};`,
		)
		.join("\n\t")}
	cout << ${nameFn}(${testcase.input.map(i => i.name).join(", ")}) << endl;
	return 0;
}`;
	}

	// C#
	if (language_id === 51) {
		return `${header}
using System;
class Program {
static	${code}
static void Main(string[] args)
	{
		${testcase.input
			.map(
				item =>
					`${getVarType(language_id, item.name, item.valueType, item.isArray)} = ${item.isArray ? getInputValue(item.value) : item.value};`,
			)
			.join("\n\t")}

			Console.WriteLine(${nameFn}(${testcase.input.map(i => i.name).join(", ")}));
	}
}`;
	}

	return code; // Default case
};

type RunResult = {
	index?: number;
	input: {
		valueType: string;
		isArray: boolean;
		name: string;
		value: string;
	}[];
	output: string;
	except: string;
	status: RunResultStatus;
	stderr?: string;
	runTime: number;
	source: "answer" | "user";
	error?: boolean;
};

type Props = {
	code: string;
	language_id: number;
	header?: string;
	printFn?: string;
	testcase: TestcaseType[];
	nameFn?: string;
	source: "answer" | "user";
};

export const useExecuteCode = () => {
	const executeCodeRequest = async ({
		code,
		language_id = 63,
		testcase,
		header = "",
		printFn = "",
		nameFn = "main",
		source = "user",
	}: Props): Promise<ResultTestcaseType> => {
		let statusResult: RunResultStatus = RunResultStatus.ACCEPTED; // Mặc định là ACCEPTED

		const results = await Promise.all(
			testcase.map(async (test, index) => {
				const fullCode = handleFullCode(language_id, code, test, nameFn, header);
				console.log("🚀 ~ testcase.map ~ fullCode:\n", fullCode);

				try {
					const res = await axiosClient.post("/submissions?base64_encoded=false&wait=true", {
						source_code: fullCode,
						language_id,
					});
					console.log("🚀 ~ testcase.map ~ res:", res);

					const output = res.data.stdout?.trim() ?? "";
					const stderr = res.data.stderr?.trim();
					const runTime = +res.data.time;
					const isAccepted = output === test.except;

					const resultData: RunResult = {
						input: test.input,
						output,
						except: test?.except ?? "",
						status: stderr
							? RunResultStatus.ERROR
							: isAccepted
								? RunResultStatus.ACCEPTED
								: RunResultStatus.REJECTED,
						stderr,
						runTime,
						source,
					};

					// Cập nhật statusResult dựa trên kết quả của testcase hiện tại
					if (resultData.status === RunResultStatus.ERROR) {
						statusResult = RunResultStatus.ERROR; // Nếu có ERROR thì toàn bộ kết quả là ERROR
					} else if (
						resultData.status === RunResultStatus.REJECTED &&
						statusResult !== RunResultStatus.ERROR
					) {
						statusResult = RunResultStatus.REJECTED; // Nếu có REJECTED và không có ERROR thì là REJECTED
					}

					return source === "user" ? {index, ...resultData} : resultData;
				} catch (err) {
					// Xử lý lỗi trong trường hợp request thất bại
					statusResult = RunResultStatus.ERROR;
					return {
						input: test.input,
						output: "",
						except: test.except,
						status: RunResultStatus.ERROR,
						stderr: "Submission failed",
						source,
						error: true,
						runTime: 0,
						...(source === "user" ? {index} : {}),
					};
				}
			}),
		);

		return {testcase: results, status: statusResult};
	};

	const {mutateAsync: executeCode, isPending} = useMutation({
		mutationFn: executeCodeRequest,
	});

	return {executeCode, isPending};
};
