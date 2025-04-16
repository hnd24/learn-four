"use client";

import Carousel from "@/components/carousel";
import ListCourse from "@/feature/home/list-course/list-course";

export default function HomePage() {
	return (
		<div className="w-full flex flex-col items-center justify-center px-4 pt-8 gap-12">
			<Carousel />

			<ListCourse />
		</div>
	);
}
