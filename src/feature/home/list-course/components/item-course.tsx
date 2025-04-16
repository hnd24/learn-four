import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {StarFillIcon, StarHalfIcon, StarIcon} from "@/icon";
import {BookOpen} from "lucide-react";
import Image from "next/image";

type Props = {
	banner: string;
	language: string;
	authorImage: string;
	authorName: string;
	star: number;
	lessons: number;
};

export default function ItemCourse({
	banner,
	language,
	authorImage,
	authorName,
	star,
	lessons,
}: Props) {
	return (
		<div
			className="w-full h-full relative rounded-xl cursor-pointer
			hover:-translate-y-1 hover:shadow-xl card-border duration-300 overflow-hidden z-0
			">
			<div
				className="w-full flex flex-col z-10 rounded-xl overflow-hidden border-4 border-transparent
			">
				<Image src={banner} alt="javascript" width={300} height={150} className=" w-full" />
				<div className="w-full flex flex-col bg-[#f7f7f7] py-2 px-3 gap-2 ">
					<span className="text-xl font-semibold">{language}</span>
					<ListStar number={star} />
					<div className="w-full flex justify-between gap-2 ">
						<div className="w-full flex gap-1">
							<Avatar className="size-6">
								<AvatarImage src={authorImage} alt="avatar" />
								<AvatarFallback>C4</AvatarFallback>
							</Avatar>
							<span className="">{authorName}</span>
						</div>
						<div className=" flex  gap-1">
							<BookOpen className="text-gray-500 relative -bottom-1" />
							<span className="text-lg">{lessons}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ListStar({number = 5}: {number: number}) {
	let star = [];
	let i = number;
	while (i > 0) {
		if (i >= 1) {
			star.push("fill");
		} else {
			if (i >= 0.5) {
				star.push("half");
			} else if (i < 0.5) {
				star.push("empty");
			}
		}
		i--;
	}

	return (
		<div className="flex gap-1 items-center ">
			{star.map((item, index) =>
				item === "fill" ? (
					<StarFillIcon key={index} />
				) : item === "half" ? (
					<StarHalfIcon key={index} />
				) : (
					<StarIcon key={index} />
				),
			)}
			<span className="ml-1 text-lg text-center ">{number}</span>
		</div>
	);
}
