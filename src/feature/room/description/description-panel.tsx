"use client";
import {FileText} from "lucide-react";

type Props = {
	idLesson: string;
};
export default function DescriptionPanel({idLesson}: Props) {
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
				<p>
					This panel contains additional details or documentation related to the current file or
					project.
				</p>
			</div>
		</>
	);
}
