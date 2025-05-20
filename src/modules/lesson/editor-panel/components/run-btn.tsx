"use client";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {LanguageProgramming} from "@/constants";
import {useUpdateCodeUserLesson} from "@/hook/data/lesson";
import {useExecuteCode} from "@/hook/use-exceute-code";
import {RunCode, RunResultStatus} from "@/types";
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";
import {useRoom} from "../../provider";

export default function RunButton() {
	const {
		idLesson,
		runCode,
		answerCode,
		answerTestcase,
		tempTestcases,
		code,
		language,
		setRunCode,
		setResultTestcase,
		nameFn,
		loadingLesson,
		loadingUserLesson,
	} = useRoom();
	const {isSignedIn} = useUser();
	const {executeCode} = useExecuteCode();
	const {updateCode} = useUpdateCodeUserLesson();
	const language_id = LanguageProgramming[language].id;
	const isDisabled: boolean =
		runCode === RunCode.Running || !isSignedIn || loadingLesson || loadingUserLesson;
	// Hàm xử lý kết quả trả về từ executeCode
	const handleTestcaseResult = (result: any, isUserTestcase: boolean) => {
		const status = result.status;
		const message =
			status === RunResultStatus.ERROR
				? "Something went wrong. Please try again."
				: status === RunResultStatus.REJECTED
					? "Some test cases were rejected. Please review your code."
					: "All test cases passed. Good job!";

		if (isUserTestcase) {
			setResultTestcase(result); // Lưu kết quả testcase người dùng
		}

		if (status === RunResultStatus.ERROR) {
			toast.error(message, {duration: 2000, style: {color: "#f44336"}});
		} else if (status === RunResultStatus.REJECTED) {
			toast.error(message, {duration: 2000, style: {color: "#f44336"}});
		} else {
			toast.success(message, {duration: 2000, style: {color: "#4caf50"}});
		}
	};

	const handleRunCode = async () => {
		setRunCode(RunCode.Running);
		await updateCode(idLesson, code); // Cập nhật code của người dùng
		// Kiểm tra testcase của người dùng trước
		const resultCheckTempTC = await executeCode({
			code: answerCode,
			language_id,
			testcase: tempTestcases,
			nameFn,
			source: "user",
		});
		const {status: statusCheckTC, testcase: resultTempTC} = resultCheckTempTC;

		// Nếu có lỗi hoặc rejected trong việc kiểm tra testcase của người dùng
		if (statusCheckTC === RunResultStatus.ERROR || statusCheckTC === RunResultStatus.REJECTED) {
			handleTestcaseResult(resultCheckTempTC, true);
			setRunCode(RunCode.Success); // Xác nhận đã chạy xong
			return;
		}

		// Tiến hành kiểm tra câu trả lời của hệ thống
		const resultCheckAnswer = await executeCode({
			code: code,
			language_id,
			testcase: answerTestcase,
			nameFn,
			source: "answer",
		});

		handleTestcaseResult(resultCheckAnswer, false); // Kiểm tra kết quả trả lời
		setResultTestcase({
			testcase: resultTempTC,
			status: resultCheckAnswer.status,
		});
		setRunCode(RunCode.Success); // Xác nhận đã chạy xong
	};

	return (
		<Hint label={isSignedIn ? "Run and save your code" : "You must log in"} side="top">
			<div>
				<Button
					disabled={isDisabled}
					onClick={handleRunCode}
					className="py-2 px-8 border border-gray-100 rounded-none bg-zinc-700 cursor-pointer">
					<span className="font-sans text-sm ">Run</span>
				</Button>
			</div>
		</Hint>
	);
}
