"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Level} from "@/constants";
import {useUploadProblem} from "@/hook/use-upload-problem";

export default function SearchLevelProblem() {
	const {
		config: {level},
		setConfig,
	} = useUploadProblem();

	return (
		<Select value={level} onValueChange={value => setConfig({level: value})}>
			<SelectTrigger className="min-w-28 sm:min-w-32 h-9 border-2 border-gray-100 shadow-lg">
				<SelectValue placeholder="Difficulty" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(Level).map(({icon, value, label}) => {
					const Icon = icon;
					return (
						<SelectItem key={label} value={value + ""}>
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
