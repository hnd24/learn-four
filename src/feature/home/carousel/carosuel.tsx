"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {defaultBanner} from "@/data";
import {cn} from "@/lib/utils";
import {useCourseStore} from "@/providers/course-store-provider";
import {CourseStateType} from "@/types";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export default function Carousel() {
	const {courses: data, loading} = useCourseStore(state => state);
	const courses = data.filter(course => course.status !== "rejected");
	const [current, setCurrent] = useState(1); // start from 1 to match the extendedImages array
	const carouselRef = useRef<HTMLDivElement>(null);
	const listItem: Partial<CourseStateType>[] = [...defaultBanner, ...courses];
	const transitionLockRef = useRef(false); // ✅ ref to lock transition
	const totalImages = listItem.length;

	useEffect(() => {
		const slideInterval = setInterval(() => {
			nextSlide();
		}, 60000);

		return () => clearInterval(slideInterval);
	}, [current]);

	const handleTransitionEnd = () => {
		const carousel = carouselRef.current;
		transitionLockRef.current = false;

		if (current === 0) {
			// if we are at the clone last (left), jump to the real last image
			setCurrent(totalImages);
			if (carousel) {
				carousel.style.transition = "none";
				carousel.style.transform = `translateX(-${totalImages * 100}%)`;
				void carousel.offsetWidth; // Force reflow
				carousel.style.transition = "transform 0.5s";
			}
		} else if (current === totalImages + 1) {
			// if we are at the clone first (right), jump to the real first image
			setCurrent(1);
			if (carousel) {
				carousel.style.transition = "none";
				carousel.style.transform = `translateX(-100%)`;
				void carousel.offsetWidth;
				carousel.style.transition = "transform 0.5s";
			}
		}
	};

	const nextSlide = () => {
		if (transitionLockRef.current) return;
		transitionLockRef.current = true;
		setCurrent(prev => prev + 1);
	};

	const prevSlide = () => {
		if (transitionLockRef.current) return;
		transitionLockRef.current = true;
		setCurrent(prev => prev - 1);
	};

	const handleWheel = (event: React.WheelEvent) => {
		if (transitionLockRef.current) return;

		if (event.deltaY > 0 || event.deltaX > 0) {
			nextSlide();
		} else if (event.deltaY < 0 || event.deltaX < 0) {
			prevSlide();
		}
	};

	const extendedListItem = [
		listItem[listItem.length - 1], // Clone end
		...listItem,
		listItem[0], // Clone first
	];

	return (
		<>
			{loading ? (
				<Skeleton className="h-72 w-full bg-gray-300" />
			) : (
				<div className="relative h-72 w-full ">
					<div className="w-full h-full overflow-hidden rounded-lg  shadowBlock">
						<div
							ref={carouselRef}
							onWheel={handleWheel}
							className="flex h-full transition-transform duration-500 "
							style={{transform: `translateX(-${current * 100}%)`}}
							onTransitionEnd={handleTransitionEnd}>
							{extendedListItem.map(({background, language, description, logoLanguage}, index) => (
								<div key={index} className="w-full h-full flex-shrink-0">
									<div className={cn("w-full h-full bg-gradient-to-r ", background)}>
										<div className="h-full w-full flex p-4 md:py-8 md:px-16  justify-between ">
											<div className="flex flex-col justify-center gap-3 h-full w-full lg:max-w-6/12 font-bold">
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
												height={300}
												width={300}
												className="lg:flex hidden image-shadow transition-all duration-300"
												loading="lazy"
											/>
										</div>
									</div>
									,
								</div>
							))}
						</div>
					</div>

					{/* navigate button */}
					{/* <button
				onClick={prevSlide}
				className="absolute hidden md:flex left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 border cursor-pointer">
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute hidden md:flex right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 border cursor-pointer">
				<ChevronRight size={24} />
			</button> */}

					{/* Dots Indicator */}
					<div className="flex items-center justify-center absolute -bottom-5 left-1/2 -translate-x-1/2 gap-3 z-10">
						{listItem.map((_, index) => (
							<div
								onClick={() => {
									setCurrent(index + 1);
								}}
								key={index}
								className={cn(
									"h-2 w-6 rounded-full bg-gray-400/60 transition-all duration-300 ",
									current === index + 1 ? "bg-gray-400 w-10 h-2 " : "",
								)}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}
