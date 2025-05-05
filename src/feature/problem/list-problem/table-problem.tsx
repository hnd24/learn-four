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
import {Level} from "@/constants";
import {useGetProblems} from "@/data/problem";
import {useTableProblem} from "@/hook/use-table-porblem";
import {OneStar} from "@/icon/star";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import LoadMoreButton from "./components/load-more-button";
import SkeletonTableProblem from "./components/skeleton-table-problem";

export default function TableProblem() {
	const {
		config: {levelColumn, nameColumn, topicColumn, starColumn},
	} = useTableProblem();
	const {getProblems, loading} = useGetProblems();
	const data = getProblems();
	const route = useRouter();

	return loading ? (
		<SkeletonTableProblem />
	) : (
		<div className="border border-gray-100 shadow-lg rounded-md p-4 bg-white">
			<Table>
				<TableCaption>
					<LoadMoreButton />
				</TableCaption>
				<TableHeader>
					<TableRow>
						{/* <TableHead className={cn((!stateColumn || !isSignedIn) && "hidden")}>State</TableHead> */}
						<TableHead className={cn(!levelColumn && "hidden")}>Level</TableHead>
						<TableHead className={cn(!nameColumn && "hidden")}>Name</TableHead>
						<TableHead className={cn(!topicColumn && "hidden")}>Topic</TableHead>
						<TableHead className={cn("text-right pr-3", !starColumn && "hidden")}>Star</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map(({_id: idProblem, level, name, topic, star}, index) => {
						const IconLevel = Level[level as keyof typeof Level].icon;
						// const IconState = StateProblem[state as keyof typeof StateProblem].icon;
						return (
							<TableRow
								onClick={() => {
									route.push(`/problem/${idProblem}`);
								}}
								key={index}
								className={cn(
									"hover:bg-gray-200 cursor-pointer",
									index % 2 === 0 && "bg-gray-100",
								)}>
								{/* <TableCell className={cn("font-medium", (!stateColumn || !isSignedIn) && "hidden")}>
										<div className="flex gap-1">
											<IconState className={cn("hidden size-4 ml-2", state === "Solved" && "flex")} />
										</div>
									</TableCell> */}
								<TableCell className={cn(!levelColumn && "hidden")}>
									<div className="flex gap-2 ml-2 md:ml-0  items-center">
										<IconLevel />
										<span className=" hidden md:flex">{level}</span>
									</div>
								</TableCell>
								<TableCell className={cn(!nameColumn && "hidden")}>
									<div className="max-w-52 md:max-w-full truncate">{name}</div>
								</TableCell>
								<TableCell className={cn(!topicColumn && "hidden")}>{topic}</TableCell>
								<TableCell className={cn("flex justify-end", !starColumn && "hidden")}>
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
