"use client";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Level} from "@/constants";
import {useGetLessons} from "@/hook/data/lesson";
import {cn} from "@/lib/utils";
import {LessonType} from "@/types";
import {FileText, Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useRoom} from "../provider";
import SkeletonTableLesson from "./skeleton-table-lesson";

type Props = {
	className?: string;
	courseId: string;
	cLessonId: string;
};

export default function SheetListLesson({className, courseId = "", cLessonId = ""}: Props) {
	const {loadingLesson} = useRoom();
	const [data, setData] = useState<LessonType[]>([]);
	const {getLessons, loading} = useGetLessons();
	useEffect(() => {
		const fetchLessons = async () => {
			const lessons = await getLessons(courseId);
			setData(lessons);
		};
		fetchLessons();
	}, [getLessons]);
	const route = useRouter();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className={cn(
						"border-x-2 border-gray-300 bg-zinc-200 hover:bg-zinc-300 cursor-pointer ",
						className,
					)}>
					{loadingLesson ? (
						<Loader2 className="size-5 animate-spin" />
					) : (
						<FileText className="size-5  text-deepBlue " />
					)}
					<span className="font-sans text-sm">List lesson</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="!w-[85%] gap-0">
				<SheetHeader>
					<SheetTitle>List lesson </SheetTitle>
					<SheetDescription>
						Select a lesson to start or continue your learning journey.
					</SheetDescription>
				</SheetHeader>
				<div className="w-full h-0.5 bg-gray-300" />
				<ScrollArea className="flex-1 w-full h-full overflow-auto">
					{/* List lesson */}
					{loading ? (
						<SkeletonTableLesson />
					) : (
						<>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Topic</TableHead>
										<TableHead>Level</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data &&
										data.map(({_id: idLesson, level, topic, star}, index) => {
											const IconLevel = Level[level as keyof typeof Level].icon;
											return (
												<TableRow
													onClick={() => {
														if (cLessonId === idLesson) return;
														route.push(`/room/${idLesson}`);
													}}
													key={index}
													className={cn(
														"hover:bg-gray-200 cursor-pointer rounded-lg",
														index % 2 === 0 && "bg-gray-100",
														cLessonId === idLesson && "bg-gray-300  cursor-auto",
													)}>
													<TableCell>
														<span className="w-[20px] truncate ">{topic}</span>
													</TableCell>
													<TableCell>
														<div className="flex gap-2 ml-2 md:ml-0  items-center">
															<IconLevel />
														</div>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</>
					)}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
