"use client";
import {useGetCourses} from "@/data/course";
import {useExecuteCourse} from "@/hook/use-execute-course";
import {useCourseStore} from "@/providers/course-store-provider";
import {useEffect} from "react";
import Carousel from "../carousel/carosuel";
import ListCourse from "../list-course/list-course";

export default function ContentHome() {
	const {setConfig} = useExecuteCourse();
	const {getCourses, loading} = useGetCourses();
	const {courses, changeCoursesState} = useCourseStore(state => state);

	useEffect(() => {
		setConfig({loading});
	}, [loading]);

	useEffect(() => {
		if (loading) return;
		changeCoursesState(getCourses());
	}, [loading, getCourses()]);

	return (
		<div className="w-full h-full flex flex-col gap-10 md:gap-16">
			<Carousel />
			<ListCourse />
		</div>
	);
}
