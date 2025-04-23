import {StarFillIcon, StarHalfIcon, StarIcon} from "@/icon/star";
import {cn} from "@/lib/utils";
import {PersonStanding} from "lucide-react";

export default function ListStar({
	star = 5,
	learner,
	className,
}: {
	star: number;
	learner?: number;
	className?: string;
}) {
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
			<div className={cn("flex gap-1 ml-1 text-lg text-center", className)}>
				<span className="">{star}</span>
				{learner && (
					<div className="flex gap-1 text-lg text-center ">
						<span>-</span>
						<PersonStanding size={20} className=" relative top-1" />
						<span>{learner}</span>
					</div>
				)}
			</div>
		</div>
	);
}
