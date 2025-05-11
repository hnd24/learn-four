"use client";

import {useGetCourses} from "@/data/course";
import {CourseStateType} from "@/types";
import {useEffect, useState} from "react";
import Banner from "../components/banner";
import SkeletonBanner from "../components/skeleton-banner";
import TableLesson from "../list-lesson/table-lesson";

type Props = {
	language: string;
};

export default function ContentCourse({language}: Props) {
	const [courseInfo, setCourseInfo] = useState<CourseStateType | undefined>(undefined);
	const {getCourses, loading} = useGetCourses();
	useEffect(() => {
		const fetchCourses = async () => {
			const courses = await getCourses();
			const data = courses.find(course => course.extension === language);
			setCourseInfo(data);
		};
		fetchCourses();
	}, [language, getCourses]);

	return (
		<div className="w-full grid grid-cols-12">
			<div className="col-span-full lg:col-span-1  w-full " />
			<div className="flex flex-col col-span-full lg:col-span-10 gap-8">
				{loading ? <SkeletonBanner /> : courseInfo && <Banner course={courseInfo!} />}
				<div className="flex flex-col w-full border rounded-lg shadow-xl p-4 md:p-8 gap-4 md:gap-8">
					<div className="h-[300px] flex flex-col gap-4">
						<span className="w-full text-3xl font-bold text-gray-800">Description</span>
						<div className=""></div>
					</div>
					<div className="flex flex-col gap-4">
						<span className="w-full text-3xl font-bold text-gray-800">List lesson</span>
						<TableLesson />
					</div>
				</div>
			</div>
			<div className="col-span-full lg:col-span-1  w-full " />
		</div>
	);
}
