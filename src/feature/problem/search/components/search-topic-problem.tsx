"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {TopicProblem} from "@/constants";
import {useUploadProblem} from "@/hook/use-upload-problem";

export default function SearchTopicProblem() {
	const {
		config: {topic},
		setConfig,
	} = useUploadProblem();
	return (
		<Select value={topic} onValueChange={value => setConfig({topic: value})}>
			<SelectTrigger className="w-full min-w-60 h-9 border-2 border-gray-100 shadow-lg">
				<SelectValue placeholder="Topic" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(TopicProblem).map(({value}, index) => (
					<SelectItem key={index} value={value}>
						{value}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
