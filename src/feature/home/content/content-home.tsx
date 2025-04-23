"use client";
import {useGetCourses} from "@/data/course";
import {useCourseStore} from "@/providers/course-store-provider";
import {useEffect} from "react";
import Carousel from "../carousel/carosuel";
import ListCourse from "../list-course/list-courses";

export default function ContentHome() {
	const {getCourses, loading} = useGetCourses();
	const {changeCoursesState, changeLoadingState} = useCourseStore(state => state);
	const data = getCourses();

	useEffect(() => {
		if (!loading) {
			changeCoursesState(data);
		}
	}, [data]);
	useEffect(() => {
		changeLoadingState(loading);
	}, [loading]);

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
