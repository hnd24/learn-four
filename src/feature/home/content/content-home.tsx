"use client";
import {useGetCourses} from "@/data/course";
import {useCourseStore} from "@/providers/course-store-provider";
import {useEffect} from "react";
import Carousel from "../carousel/carosuel";
import ListCourse from "../list-course/list-course";

export default function ContentHome() {
	const {getCourses} = useGetCourses();
	const {loading, changeCoursesState} = useCourseStore(state => state);
	const data = getCourses();

	useEffect(() => {
		if (loading) {
			changeCoursesState([], loading);
		} else {
			changeCoursesState(data, loading);
		}
	}, [loading, data]);

	return (
		<div className="w-full h-full flex flex-col gap-10 md:gap-16">
			{/* <Button
				onClick={() => {
					changeCoursesState({coursesState: data, loading: !loading});
				}}>
				Change
			</Button> */}
			<Carousel />
			<ListCourse />
		</div>
	);
}
