"use client";

import {useCourseStore} from "@/providers/course-store-provider";

export default function TestC() {
	const {courses} = useCourseStore(state => state);
	return (
		<>
			{courses.map((course, index) => (
				<div key={index} className="w-full h-20 bg-slate-200 flex items-center justify-center mb-2">
					{course.language}
				</div>
			))}
		</>
	);
}
