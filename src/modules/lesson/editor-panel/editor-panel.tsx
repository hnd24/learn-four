"use client";
import {useGetUserLesson} from "@/hook/data/lesson";
import {UserLessonType} from "@/types";
import {useEffect, useState} from "react";
import {useRoom} from "../provider";
import {CodeEditor} from "./components/code-editor";
import RunButton from "./components/run-btn";
import SelectLanguage from "./components/select-language";

type Props = {
	idLesson: string;
};

export default function EditorPanel({idLesson}: Props) {
	const [data, setData] = useState<UserLessonType | null>(null);
	const {setCode, setLoadingUserLesson, structureAnswer	} = useRoom();
	const {getUserLesson, loading} = useGetUserLesson();

	useEffect(() => {
		const fetchUserLesson = async () => {
			const data = await getUserLesson(idLesson);
			setData(data);
		};
		fetchUserLesson();
	}, [getUserLesson, idLesson]);
	useEffect(() => {
		setLoadingUserLesson(loading);
	}, [loading]);

	useEffect(() => {
		if (!data?.code) return;
		const codeMap = data.code as Record<string, string>;
		const listCode: Record<string, string> = {};
		Object.entries(structureAnswer).forEach(([key, value]) => {
			if (codeMap[key]) {
				listCode[key] = codeMap[key];
			} else {
				listCode[key] = value || "";
			}
		});
		setCode(listCode);
		console.log("🚀 ~ useEffect ~ listCode:", listCode);
	}, [data]);

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
