"use client";
import SheetListLesson from "../components/sheet-list-lesson";
import {useRoom} from "../provider";
import SkeletonDescription from "./components/skeleton-description";

type Props = {
	content: string;
	courseId: string;
	cLessonId: string;
};
export default function DescriptionPanel({content = "", courseId = "", cLessonId = ""}: Props) {
	const {loadingLesson} = useRoom();
	return (
		<>
			{/* Header */}
			<div className="flex items-center gap-1 p-0.5 border-b border-charcoal bg-zinc-200">
				<SheetListLesson
					className=" text-gray-800 font-semibold"
					courseId={courseId}
					cLessonId={cLessonId}
				/>
			</div>

			{/* Body */}
			<div className="flex-1 p-4 text-sm text-zinc-700 ">
				{/* Nội dung mô tả sẽ được thêm vào đây */}
				{loadingLesson && <SkeletonDescription />}
				<p>{content}</p>
			</div>
		</>
	);
}
