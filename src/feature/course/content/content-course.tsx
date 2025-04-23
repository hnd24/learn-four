"use client";

import {useGetCourses} from "@/data/course";
import Banner from "../components/banner";

type Props = {
	language: string;
};

export default function ContentCourse({language}: Props) {
	const {getCourses} = useGetCourses();
	const courses = getCourses();
	const courseInfo = courses.find(course => course.extension === language);

	return (
		<div className="w-full grid grid-cols-12 ">
			<div className="col-span-full lg:col-span-1  w-full " />
			<div className="flex flex-col col-span-full lg:col-span-10">
				<Banner course={courseInfo!} />
			</div>
			<div className="col-span-full lg:col-span-1  w-full " />
		</div>
	);
}
