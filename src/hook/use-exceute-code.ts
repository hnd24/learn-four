import {axiosClient} from "@/lib/axios";
import {ResultTestcaseType, RunResultStatus, TestcaseType} from "@/types";
import {useMutation} from "@tanstack/react-query";

type RunResult = {
	index?: number;
	input: {
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
	testcase: TestcaseType[];
	nameFn?: string;
	source: "answer" | "user";
};

export const handleFullCode = (
	language_id: number,
	code: string,
	testcase: TestcaseType,
	nameFn: string,
) => {
	if (language_id === 63) {
		const readInput = `
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8').split('\\n');
${testcase.input.map((item, idx) => `const ${item.name} = JSON.parse(input[${idx}]);`).join("\n")}
`;
		const callFn = `console.log(${nameFn}(${testcase.input.map(i => i.name).join(", ")}));`;
		return `${readInput}\n${code}\n${callFn}`;
	}
	return code;
};

export const useExecuteCode = () => {
	const executeCodeRequest = async ({
		code,
		language_id = 63,
		testcase,
		nameFn = "main",
		source = "user",
	}: Props): Promise<ResultTestcaseType> => {
		let statusResult: RunResultStatus = RunResultStatus.ACCEPTED; // Mặc định là ACCEPTED

		const results = await Promise.all(
			testcase.map(async (test, index) => {
				const inputValues = test.input.map(i => i.value).join("\n");
				const fullCode = handleFullCode(language_id, code, test, nameFn);

				try {
					const res = await axiosClient.post("/submissions?base64_encoded=false&wait=true", {
						source_code: fullCode,
						language_id,
						stdin: inputValues,
					});

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
