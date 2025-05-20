"use client";
import {Button} from "@/components/ui/button";
import {useGetProblems} from "@/hook/data/problem";
import {useUploadProblem} from "@/hook/use-upload-problem";
import {cn} from "@/lib/utils";
import {Loader2} from "lucide-react";
type Props = {
	className?: string;
};

export default function SearchButton({className}: Props) {
	const {
		config: {topic, level, star, name},
	} = useUploadProblem();
	const {getProblems, loading} = useGetProblems();

	const handleSearch = () => {
		if (name) {
			getProblems(topic, +level, +star, name);
			return;
		}
		getProblems(topic, +level, +star);
		return;
	};
	return (
		<Button
			onClick={handleSearch}
			disabled={loading}
			className={cn("bg-deepBlue hover:bg-darkDeepBlue text-gray-100 border gap-1", className)}>
			<Loader2 className={cn("hidden animate-spin", loading && "flex")} />
			Search
		</Button>
	);
}
