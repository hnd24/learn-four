"use client";
import {useGetUserLesson} from "@/hook/data/lesson";
import {RunCode} from "@/types";
import {Loader2, SquareDashedBottomCode} from "lucide-react";
import {useEffect} from "react";
import {useRoom} from "../provider";
import {CodeEditor} from "./components/code-editor";
import RunButton from "./components/run-btn";
import SelectLanguage from "./components/select-language";

type Props = {
	idLesson: string;
};

export default function EditorPanel({idLesson}: Props) {
	const {setCode, runCode, setLoadingUserLesson, loadingUserLesson} = useRoom();
	const {getUserLesson, loading} = useGetUserLesson();

	useEffect(() => {
		const fetchUserLesson = async () => {
			const data = await getUserLesson(idLesson);
			setCode(data.code);
		};
		fetchUserLesson();
	}, [getUserLesson, idLesson]);
	useEffect(() => {
		setLoadingUserLesson(loading);
	}, [loading]);
	return (
		<>
			<div className="flex items-center  px-4  border-b border-b-charcoal bg-zinc-200">
				<div className="py-2 pr-4 border-r-2 border-zinc-300">
					{runCode === RunCode.Running || loadingUserLesson ? (
						<Loader2 className="size-5 animate-spin" />
					) : (
						<SquareDashedBottomCode className="size-5 text-leafyGreen" />
					)}
				</div>
				<SelectLanguage />
				<RunButton />
			</div>
			<CodeEditor />
		</>
	);
}
