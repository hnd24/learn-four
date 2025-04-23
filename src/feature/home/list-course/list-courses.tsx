"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {useCourseStore} from "@/providers/course-store-provider";
import ItemCourse from "./components/item-course";

export default function ListCourse() {
	const {courses, loading} = useCourseStore(state => state);
	const numberCourse = Array.from({length: 3}, (_, i) => i);

	return (
		<div className="h-full w-full border border-gray-100 p-4 md:p-8 gap-4 rounded-lg bg-white shadow-xl flex flex-col">
			<span className="w-full text-3xl font-bold text-gray-800">List Course :</span>
			<div className="h-full w-full  grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
				{loading
					? numberCourse.map((_, index) => (
							<Skeleton key={index} className="h-80 w-full bg-gray-300 rounded-lg " />
						))
					: courses.map((item, index) => (
							<ItemCourse
								key={index}
								extension={item.extension ?? ""}
								banner={item.banner ?? ""}
								language={item.language ?? ""}
								authorImage={item.authorImage ?? ""}
								authorName={item.authorName ?? ""}
								star={item.star ?? 0}
								learner={item.learner ?? 0}
								lessons={item.lessons ?? 0}
								status={item.status ?? "rejected"}
							/>
						))}
			</div>
		</div>
	);
}
