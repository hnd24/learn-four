"use client";
import {useGetLessonById} from "@/data/lesson";
import {FileText} from "lucide-react";
import {useEffect, useState} from "react";

type Props = {
	idLesson: string;
};
export default function DescriptionPanel({idLesson}: Props) {
	const [content, setContent] = useState<string>("");
	const {getLessonById, loading} = useGetLessonById();

	useEffect(() => {
		const fetchUserLesson = async () => {
			const data = await getLessonById(idLesson);
			setContent(data.content);
		};
		fetchUserLesson();
	}, [getLessonById, idLesson]);
	return (
		<>
			{/* Header */}
			<div className="flex items-center gap-1 px-4 py-2 border-b border-charcoal bg-zinc-200">
				<FileText className="w-5 h-5 text-deepBlue " />
				<span className="text-sm font-medium text-zinc-800 ">Description</span>
			</div>

			{/* Body */}
			<div className="flex-1 p-4 text-sm text-zinc-700 ">
				{/* Nội dung mô tả sẽ được thêm vào đây */}
				<p>{content}</p>
			</div>
		</>
	);
}
