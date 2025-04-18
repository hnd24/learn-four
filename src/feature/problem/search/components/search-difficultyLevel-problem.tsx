"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {DifficultLevelProblem} from "@/constants";
import {useUploadProblem} from "@/hook/use-upload-problem";

export default function SearchDifficultyLevelProblem() {
	const {
		config: {difficultyLevel},
		setConfig,
	} = useUploadProblem();

	return (
		<Select value={difficultyLevel} onValueChange={value => setConfig({difficultyLevel: value})}>
			<SelectTrigger className="min-w-28 sm:min-w-32 h-9 border-2 border-gray-100 shadow-lg">
				<SelectValue placeholder="Difficulty" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(DifficultLevelProblem).map(({icon, value, label}, index) => {
					const Icon = icon;
					return (
						<SelectItem key={index} value={value + ""}>
							<div className="flex items-center gap-2">
								<Icon />
								<span>{label}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
