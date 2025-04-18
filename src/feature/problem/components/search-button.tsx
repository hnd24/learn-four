"use client";
import {Button} from "@/components/ui/button";
import {useGetProblems} from "@/data/problem";
import {useUploadProblem} from "@/hook/use-upload-problem";
import {cn} from "@/lib/utils";
import {Loader2} from "lucide-react";
type Props = {
	className?: string;
};

export default function SearchButton({className}: Props) {
	const {
		config: {topic, difficultyLevel, star, state, searchName},
	} = useUploadProblem();
	const {getProblems, loading} = useGetProblems();

	const handleSearch = () => {
		if (searchName) {
			getProblems({topic, difficultyLevel, star, state, searchName});
			return;
		}
		getProblems({topic, difficultyLevel, star, state});
		return;
	};
	return (
		<Button
			onClick={handleSearch}
			disabled={loading}
			className={cn("bg-deepBlue hover:bg-deepBlueHover text-gray-100 border gap-1", className)}>
			<Loader2 className={cn("hidden animate-spin", loading && "flex")} />
			Search
		</Button>
	);
}
