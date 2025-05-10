"use client";

import {
	CarouselContent,
	CarouselItem,
	Carousel as CarouselPrimitive,
} from "@/components/ui/carousel";
import {Skeleton} from "@/components/ui/skeleton";
import {defaultBanner} from "@/data";
import {useGetCourses} from "@/data/course";
import {cn} from "@/lib/utils";
import {CourseStateType} from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Carousel() {
	const {getCourses, loading} = useGetCourses();
	const data = getCourses();
	const courses = data.filter(course => course.status !== "rejected");

	const listItem: Partial<CourseStateType>[] = [...defaultBanner, ...courses];

	return (
		<>
			{loading ? (
				<Skeleton className="h-72 w-full bg-gray-300" />
			) : (
				<CarouselPrimitive
					plugins={[
						Autoplay({
							delay: 60000,
							stopOnInteraction: true,
						}),
					]}
					opts={{
						loop: true, // Enable infinite looping
						align: "center",
					}}
					className="border border-gray-100 rounded-lg overflow-hidden shadowBlock">
					<CarouselContent className="h-72 rounded-lg">
						{listItem.map(({background, language, description, logoLanguage}, index) => (
							<CarouselItem key={index}>
								<div className=" h-full flex-shrink-0">
									<div className={cn(" h-full bg-gradient-to-r ", background)}>
										<div className="h-full flex px-4 md:px-12 justify-between ">
											<div className="flex flex-col justify-center gap-3 h-full w-full lg:max-w-1/2 font-bold">
												<span className="text-4xl md:text-5xl text-white text-shadow">
													{language}
												</span>
												<div className="flex flex-col text-md md:text-lg text-gray-100 text-shadow">
													<span>{description}</span>
												</div>
											</div>
											<Image
												src={logoLanguage ?? ""}
												alt="programer"
												height={200}
												width={200}
												className="lg:flex hidden image-shadow transition-all duration-300"
											/>
										</div>
									</div>
									,
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</CarouselPrimitive>
			)}
		</>
	);
}
