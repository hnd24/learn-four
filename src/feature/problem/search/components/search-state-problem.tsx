"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {StateProblem} from "@/constants";
import {useUploadProblem} from "@/hook/use-upload-problem";

export default function SearchStateProblem() {
	const {
		config: {state},
		setConfig,
	} = useUploadProblem();
	return (
		<Select value={state} onValueChange={value => setConfig({state: value})}>
			<SelectTrigger className="min-w-24 sm:min-w-36 h-9 border-2 border-gray-100 shadow-lg">
				<SelectValue placeholder="Star" />
			</SelectTrigger>
			<SelectContent className="w-full">
				{Object.values(StateProblem).map(({icon, value}, index) => {
					const Icon = icon;
					return (
						<SelectItem key={index} value={value}>
							<div className="flex items-center  justify-between gap-2">
								<Icon />
								<span>{value}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
