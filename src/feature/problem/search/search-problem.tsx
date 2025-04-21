"use client";
import {Hint} from "@/components/hint";
import SearchButton from "../components/search-button";
import ColumnTable from "../list-problem/components/column-table";
import SearchDifficultyLevelProblem from "./components/search-difficultyLevel-problem";
import SearchNameProblem from "./components/search-name-problem";
import SearchStarProblem from "./components/search-star-problem";
import SearchStateProblem from "./components/search-state-problem";
import SearchTopicProblem from "./components/search-topic-problem";

export default function SearchProblem() {
	return (
		<div className="w-full hidden md:flex flex-col 2xl:flex-row gap-2">
			{/* ************************** */}
			<div className="flex flex-col xl:flex-row gap-2 ">
				<div className="flex gap-2 w-full ">
					<div className="hidden md:flex">
						<ColumnTable />
					</div>
					<Hint label="Select State" side="top">
						<div>
							<SearchStateProblem />
						</div>
					</Hint>
					<Hint label="Select Difficulty Level" side="top">
						<div>
							<SearchDifficultyLevelProblem />
						</div>
					</Hint>
					<Hint label="Select Star" side="top">
						<div>
							<SearchStarProblem />
						</div>
					</Hint>
				</div>
				{/* ************************** */}
				<Hint label="Select Topic" side="top">
					<div className="w-full">
						<SearchTopicProblem />
					</div>
				</Hint>
			</div>
			{/* ************************** */}
			<div className="flex gap-2 w-full">
				<Hint label="Search Name" side="top">
					<div className="w-full">
						<SearchNameProblem />
					</div>
				</Hint>
				<SearchButton />
			</div>
		</div>
	);
}
