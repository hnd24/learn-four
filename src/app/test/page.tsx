"use client";
import {
	CarouselContent,
	CarouselItem,
	Carousel as CarouselPrimitive,
} from "@/components/ui/carousel";
import {defaultBanner} from "@/data";
import {useGetCourses} from "@/data/course";
import {cn} from "@/lib/utils";
import {CourseStateType} from "@/types";
import Image from "next/image";
export default function page() {
	const {getCourses, loading} = useGetCourses();
	const data = getCourses();
	const courses = data.filter(course => course.status !== "rejected");
	const listItem: Partial<CourseStateType>[] = [...defaultBanner, ...courses];

	return <div className=" grid place-items-center "></div>;
}
