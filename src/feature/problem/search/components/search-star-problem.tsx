"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {StarProblem} from "@/constants";
import {useUploadProblem} from "@/hook/use-upload-problem";
import {OneStar} from "@/icon/star";

export default function SearchStarProblem() {
	const {
		config: {star},
		setConfig,
	} = useUploadProblem();
	return (
		<Select value={star} onValueChange={value => setConfig({star: value})}>
			<SelectTrigger className="w-full md:min-w-60 h-9 border-2 border-gray-100 shadow-lg">
				<SelectValue placeholder="Star" />
			</SelectTrigger>
			<SelectContent className="w-full">
				{Object.values(StarProblem).map(({value, star, icon}, index) => {
					const Icon = icon;
					return (
						<SelectItem key={index} value={value}>
							<div className="flex gap-2">
								<Icon className="hidden md:flex" />
								<OneStar className="md:hidden" />
								<span>{star}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
