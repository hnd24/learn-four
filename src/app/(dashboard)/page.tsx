"use client";

import Carousel from "@/components/carousel";
import ListCourse from "@/feature/home/list-course/list-course";
import {CourseStoreProvider} from "@/providers/course-store-provider";

export default function HomePage() {
	return (
		<CourseStoreProvider>
			<div className="w-full h-full flex flex-col px-4 pt-8 gap-10">
				<Carousel />

				<ListCourse />
			</div>
		</CourseStoreProvider>
	);
}
