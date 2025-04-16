"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {courseData} from "@/data";
import {useExecuteCourse} from "@/hook/use-execute-course";
import {useCourseStore} from "@/providers/course-store-provider";
import {useEffect} from "react";
import ItemCourse from "./components/item-course";

export default function ListCourse() {
	const {courses, changeCoursesState} = useCourseStore(state => state);
	const {
		config: {loading},
		setConfig,
	} = useExecuteCourse();
	const pending = true;
	const courseData1 = 2;
	const numberCourse = Array.from({length: 3}, (_, i) => i);

	useEffect(() => {
		changeCoursesState(courseData);
		courses.map(item => {
			console.table(item);
		});
	}, [courseData1]);

	return (
		<div className="h-full w-full border border-gray-100 p-4 md:p-8 gap-4 rounded-lg bg-white shadow-xl flex flex-col">
			<span className="w-full text-3xl font-bold text-gray-800">List Course :</span>
			<div className="h-full w-full  grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 *: gap-6">
				{loading
					? numberCourse.map((item, index) => (
							<Skeleton key={index} className="h-72 w-full bg-gray-300 rounded-lg " />
						))
					: courses.map((item, index) => (
							<ItemCourse
								key={index}
								banner={item.banner ?? ""}
								language={item.language ?? ""}
								authorImage={item.authorImage ?? ""}
								authorName={item.authorName ?? ""}
								star={item.star ?? 0}
								lessons={item.lessons ?? 0}
							/>
						))}
			</div>
		</div>
	);
}
