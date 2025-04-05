import {cn} from "@/lib/utils";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

const listItem = [
	{
		background: "from-[#484ce3] to-[#a6bcfb]",
		title: "Learn Four",
		description:
			"This place helps you learn programming languages. As well as challenge each other with coding problems to improve your skills together",
		image: "/images/programer.svg",
	},
	{
		background: "from-[#c49d0a] to-[#f7ef4d]",
		title: "Javascript",
		description:
			"JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced.",
		image: "/images/javascript-icon.svg",
	},
	{
		background: "from-[#2371b1] to-[#91c2e8]",
		title: "Python",
		description:
			"Python is a programming language that lets you work quickly and integrate systems more effectively. Python is powerful... and fast; plays well with others; and runs everywhere.",
		image: "/images/python-icon.svg",
	},
	{
		background: "from-[#dd5902] to-[#ffbd4d]",
		title: "Java",
		description:
			"Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
		image: "/images/java-icon.svg",
	},
	{
		background: "from-[#004482] to-[#83d9ff]",
		title: "C++",
		description:
			"C++ is a general-purpose programming language created by Bjarne Stroustrup. It has imperative, object-oriented and generic programming features, while also providing facilities for low-level memory manipulation.",
		image: "/images/cpp-icon.svg",
	},
	{
		background: "from-[#662579] to-[#e0b5f2]",
		title: "C#",
		description:
			"C# is a modern, object-oriented programming language developed by Microsoft. It is designed for building a variety of applications that run on the .NET Framework.",
		image: "/images/csharp-icon.svg",
	},
];

export default function Carousel() {
	const [current, setCurrent] = useState(1); // start from 1 to match the extendedImages array
	const carouselRef = useRef<HTMLDivElement>(null);

	const transitionLockRef = useRef(false); // ✅ ref to lock transition
	const totalImages = listItem.length;

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

	const extendedListItem = [
		listItem[listItem.length - 1], // Clone end
		...listItem,
		listItem[0], // Clone first
	];
	useEffect(() => {
		const slideInterval = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(slideInterval);
	}, [current]);
	return (
		<div className="relative h-72 px-8">
			<div className="w-full h-full overflow-hidden rounded-lg shadowBlock">
				<div
					ref={carouselRef}
					className="flex h-full transition-transform duration-500 "
					style={{transform: `translateX(-${current * 100}%)`}}
					onTransitionEnd={handleTransitionEnd}>
					{extendedListItem.map((item, index) => (
						<div key={index} className="w-full h-full flex-shrink-0">
							<div className={cn("w-full h-full bg-gradient-to-r ", item.background)}>
								<div className="h-full w-full flex p-4 md:py-8 md:px-16  justify-between ">
									<div className="flex flex-col justify-center gap-3 h-full w-full lg:max-w-6/12 font-bold">
										<span className="text-4xl md:text-5xl text-white text-shadow">
											{item.title}
										</span>
										<div className="flex flex-col text-md md:text-lg text-gray-100 text-shadow">
											<span>{item.description}</span>
										</div>
									</div>
									<Image
										src={item.image}
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
			<button
				onClick={prevSlide}
				className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 border cursor-pointer">
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 border cursor-pointer">
				<ChevronRight size={24} />
			</button>

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
	);
}
