"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Level} from "@/constants";
import {useGetLessons} from "@/data/lesson";
import {OneStar} from "@/icon/star";
import {cn} from "@/lib/utils";
import {LessonType} from "@/types";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import SkeletonTableLesson from "./components/skeleton-table-lesson";

export default function TableLesson({languageCourse}: {languageCourse: string}) {
	const [data, setData] = useState<LessonType[]>([]);
	const {getLessons, loading} = useGetLessons();
	useEffect(() => {
		const fetchLessons = async () => {
			const lessons = await getLessons(languageCourse);
			setData(lessons);
		};
		fetchLessons();
	}, [getLessons]);
	const route = useRouter();

	return loading ? (
		<SkeletonTableLesson />
	) : (
		<div className="border border-gray-100 shadow-lg rounded-md p-4 bg-white">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Level</TableHead>

						<TableHead>Topic</TableHead>
						<TableHead className={cn("text-right pr-3")}>Star</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data &&
						data.map(({_id: idProblem, level, topic, star}, index) => {
							const IconLevel = Level[level as keyof typeof Level].icon;
							return (
								<TableRow
									onClick={() => {
										route.push(`/room/${idProblem}`);
									}}
									key={index}
									className={cn(
										"hover:bg-gray-200 cursor-pointer",
										index % 2 === 0 && "bg-gray-100",
									)}>
									<TableCell>
										<div className="flex gap-2 ml-2 md:ml-0  items-center">
											<IconLevel />
											<span className=" hidden md:flex">{level}</span>
										</div>
									</TableCell>

									<TableCell>{topic}</TableCell>
									<TableCell className="flex justify-end">
										<div className="w-10 flex gap-1">
											<OneStar />
											{star}
										</div>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</div>
	);
}
