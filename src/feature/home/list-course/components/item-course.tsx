"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {StarFillIcon, StarHalfIcon, StarIcon} from "@/icon/star";
import {cn} from "@/lib/utils";
import {StatusPlaceType} from "@/types";

import {BookOpen, PersonStanding} from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation";

type Props = {
	banner: string;
	language: string;
	authorImage: string;
	authorName: string;
	star: number;
	learner: number;
	lessons: number;
	status: StatusPlaceType;
};

export default function ItemCourse({
	banner,
	language,
	authorImage,
	authorName,
	star,
	learner,
	lessons,
	status,
}: Props) {
	const router = useRouter();
	const isApproved = status === "approved";
	const isRejected = status === "rejected";
	const handleClick = () => {
		if (isApproved) {
			router.push(`/course/${language}`);
		}
		return;
	};
	return (
		<button
			onClick={handleClick}
			className={cn(
				"w-full h-full relative rounded-xl cursor-pointer",
				"hover:-translate-y-1 hover:shadow-xl card-border duration-300 overflow-hidden z-0",
				isRejected && "hidden",
			)}>
			<div
				className={cn(
					"absolute bg-gray-900 text-gray-100 font-semibold py-1 px-2 left-0 top-4",
					isApproved && "hidden",
				)}>
				Coming soon
			</div>
			<div
				className=" w-full flex flex-col z-10 rounded-xl overflow-hidden border-4 border-transparent
			">
				<Image src={banner} alt="javascript" width={300} height={150} className=" w-full" />
				<div className="w-full flex flex-col items-start bg-[#f7f7f7] py-2 px-3 gap-2 ">
					<span className="text-xl font-semibold">{language}</span>
					<ListStar star={star} learner={learner} />
					<div className="w-full flex justify-between gap-2 ">
						<div className="w-full flex gap-1">
							<Avatar className="size-6">
								<AvatarImage src={authorImage} alt="avatar" />
								<AvatarFallback className="bg-azureBlue !text-white text-sm">C4</AvatarFallback>
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
		</button>
	);
}

export function ListStar({star = 5, learner = 0}: {star: number; learner: number}) {
	let listStar: string[] = [];
	let i = star;
	while (i > 0) {
		if (i >= 1) {
			listStar.push("fill");
		} else {
			if (i >= 0.5) {
				listStar.push("half");
			} else if (i < 0.5) {
				listStar.push("empty");
			}
		}
		i--;
	}

	return (
		<div className="flex gap-1 items-center ">
			{listStar.map((item, index) =>
				item === "fill" ? (
					<StarFillIcon key={index} />
				) : item === "half" ? (
					<StarHalfIcon key={index} />
				) : (
					<StarIcon key={index} />
				),
			)}
			<div className="flex gap-1 ml-1 text-lg text-center ">
				<span className="">{star}</span>
				<span>-</span>
				<PersonStanding size={20} className=" relative top-1" />
				<span>{learner}</span>
			</div>
		</div>
	);
}
