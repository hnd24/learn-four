"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {StateProblem} from "@/constants";
import {useTableProblem} from "@/hook/use-table-porblem";
import {OneStar} from "@/icon/star";
import {cn} from "@/lib/utils";
import {useProblemStore} from "@/providers/problem-store-provider";
import LoadMoreButton from "./components/load-more-button";

export default function ListProblem() {
	const {problems: data} = useProblemStore(state => state);
	const {
		config: {stateRow, levelRow, nameRow, topicRow, starRow},
	} = useTableProblem();
	return (
		<div className="border border-gray-100 shadow-lg rounded-md p-4 bg-white">
			<Table>
				<TableCaption>
					<LoadMoreButton />
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className={cn(!stateRow && "hidden")}>State</TableHead>
						<TableHead className={cn(!levelRow && "hidden")}>Level</TableHead>
						<TableHead className={cn(!nameRow && "hidden")}>Name</TableHead>
						<TableHead className={cn(!topicRow && "hidden")}>Topic</TableHead>
						<TableHead className={cn("text-right pr-3", !starRow && "hidden")}>Star</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map(({state, level, name, topic, star}, index) => {
						const IconState = StateProblem[state as keyof typeof StateProblem].icon;
						return (
							<TableRow
								key={index}
								className={cn("hover:bg-gray-200 ", index % 2 === 0 && "bg-gray-100")}>
								<TableCell className={cn("font-medium", !stateRow && "hidden")}>
									<div className="flex gap-1">
										<IconState className={cn("hidden size-4 ml-2", state === "Solved" && "flex")} />
									</div>
								</TableCell>
								<TableCell className={cn(!levelRow && "hidden")}>{level}</TableCell>
								<TableCell className={cn(!nameRow && "hidden")}>
									<div className="max-w-52 md:max-w-full truncate">{name}</div>
								</TableCell>
								<TableCell className={cn(!topicRow && "hidden")}>{topic}</TableCell>
								<TableCell className={cn("flex justify-end", !starRow && "hidden")}>
									<div className="w-10 flex gap-1">
										<OneStar />
										{star}
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
