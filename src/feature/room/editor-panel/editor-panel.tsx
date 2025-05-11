"use client";
import {useGetUserLesson} from "@/data/lesson";
import {Loader2, SquareDashedBottomCode} from "lucide-react";
import {useEffect} from "react";
import {useRoom} from "../provider";
import {CodeEditor} from "./components/code-editor";

type Props = {
	idLesson: string;
};

export default function EditorPanel({idLesson}: Props) {
	const {setCode} = useRoom();
	const {getUserLesson, loading} = useGetUserLesson();

	useEffect(() => {
		const fetchUserLesson = async () => {
			const data = await getUserLesson(idLesson);
			setCode(data.code);
		};
		fetchUserLesson();
	}, [getUserLesson, idLesson]);
	return (
		<>
			<div className="flex items-center gap-1 px-4 py-2 border-b border-b-charcoal bg-zinc-200">
				{loading ? (
					<Loader2 className="size-5 animate-spin" />
				) : (
					<SquareDashedBottomCode className="size-5 text-leafyGreen" />
				)}

				<span className="text-sm font-medium text-zinc-800 ">Testcase</span>
			</div>
			<CodeEditor />
		</>
	);
}
