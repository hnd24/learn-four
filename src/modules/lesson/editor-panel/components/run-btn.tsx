"use client";
import {Button} from "@/components/ui/button";
import {LanguageProgramming} from "@/constants";
import {useExecuteCode} from "@/hook/use-exceute-code";
import {RunCode, RunResultStatus} from "@/types";
import {toast} from "sonner";
import {useRoom} from "../../provider";

export default function RunButton() {
	const {
		answerCode,
		answerTestcase,
		tempTestcases,
		code,
		language,
		setRunCode,
		setResultTestcase,
		nameFn,
	} = useRoom();
	const {executeCode} = useExecuteCode();
	const language_id = LanguageProgramming[language].id;
	const handleRunCode = async () => {
		setRunCode(RunCode.Running);
		const resultCheckTempTC = await executeCode({
			code: answerCode,
			language_id,
			testcase: tempTestcases,
			nameFn,
			source: "user",
		});
		const {status: statusCheckTC, testcase: resultTemTG} = resultCheckTempTC;
		if (statusCheckTC === RunResultStatus.ERROR) {
			setResultTestcase(resultCheckTempTC);
			toast.error("Some test cases failed. Please review your code.", {
				duration: 2000,
				style: {color: "#f44336"},
			});
			setRunCode(RunCode.Success);
			return;
		} else if (statusCheckTC === RunResultStatus.REJECTED) {
			setResultTestcase(resultCheckTempTC);
			toast.error("Some test cases were rejected. Please review your code.", {
				duration: 2000,
				style: {color: "#f44336"},
			});
			setRunCode(RunCode.Success);
			return;
		} else {
			const result = await executeCode({
				code: code,
				language_id,
				testcase: answerTestcase,
				nameFn,
				source: "answer",
			});
			if (result.status === RunResultStatus.ERROR) {
				toast.error("Something went wrong. Please try again.", {
					duration: 2000,
					style: {color: "#f44336"},
				});
			} else if (result.status === RunResultStatus.REJECTED) {
				toast.error("Some test cases were rejected. Please review your code.", {
					duration: 2000,
					style: {color: "#f44336"},
				});
			} else {
				toast.success("All test cases passed. Good job!", {
					duration: 2000,
					style: {color: "#4caf50"},
				});
			}
			setResultTestcase({testcase: resultTemTG, status: result.status});
			setRunCode(RunCode.Success);
		}
	};
	return <Button onClick={handleRunCode}>Run</Button>;
}
