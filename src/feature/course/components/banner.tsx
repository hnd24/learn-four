import {Hint} from "@/components/hint";
import ListStar from "@/components/list-star";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {CourseStateType} from "@/types";
import {BookOpen} from "lucide-react";
import Image from "next/image";

export default function Banner({course}: {course: Partial<CourseStateType>}) {
	const {
		language,
		background,
		description,
		banner,
		authorName,
		authorImage,
		star,
		learner,
		lessons,
	} = course;
	return (
		<div
			className={cn(
				"w-full p-4 md:p-8 rounded-lg shadow-2xl bg-gradient-to-tr",
				"flex ",
				"font-bold",
				background,
			)}>
			<div className="flex flex-col justify-center w-full md:w-1/2 gap-6 lg:gap-10">
				<div className="flex flex-col gap-6 md:gap-3">
					<Image
						src={banner || "/images/programer.svg"}
						alt="programer"
						height={200}
						width={300}
						className="flex md:hidden shadow-xl rounded-md"
						loading="lazy"
					/>
					<span className="text-4xl md:text-5xl text-white text-shadow">{language}</span>
					<Hint side="bottom" label={description || ""}>
						<div className=" text-md md:text-lg text-gray-100 md:line-clamp-3 ">{description}</div>
					</Hint>
				</div>
				<div className="flex flex-col md:flex-row gap-2">
					<div className="w-fit px-2 py-1 bg-gray-300/35 border rounded-sm ">
						<ListStar star={star || 5} learner={learner} className=" text-gray-100" />
					</div>
					<div className="flex gap-2">
						<div className="flex items-center w-fit px-2 py-1 bg-gray-300/35 border rounded-sm ">
							<div className="w-full flex gap-1 text-gray-100">
								<Avatar className="size-6">
									<AvatarImage src={authorImage} alt="avatar" />
									<AvatarFallback className="bg-azureBlue !text-white text-sm">C4</AvatarFallback>
								</Avatar>
								<span>{authorName}</span>
							</div>
						</div>
						<div className="w-fit px-2 py-1 bg-gray-300/35 border rounded-sm ">
							<div className=" flex text-gray-100 gap-1">
								<BookOpen className=" relative -bottom-1" />
								<span className="text-lg">{lessons}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden md:flex items-center justify-end w-1/2">
				<Image
					src={banner || "/images/programer.svg"}
					alt="programer"
					height={200}
					width={300}
					className=" shadow-xl rounded-md"
					loading="lazy"
				/>
			</div>
		</div>
	);
}
