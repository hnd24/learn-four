"use client";
import {useGetUserLesson} from "@/hook/data/lesson";
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
			<div className="flex items-center p-0.5 border-b border-b-charcoal bg-zinc-200 gap-1">
				<RunButton />
				<SelectLanguage />
			</div>
			<CodeEditor />
		</>
	);
}
