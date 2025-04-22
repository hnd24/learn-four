"use client";

import {useGetProblems} from "@/data/problem";
import {useUploadProblem} from "@/hook/use-upload-problem";
import {useProblemStore} from "@/providers/problem-store-provider";
import {useUser} from "@clerk/nextjs";
import {useEffect} from "react";
import SheetSearch from "../components/sheet-search";
import ColumnTable from "../list-problem/components/column-table";
import ListProblem from "../list-problem/list-problem";
import SearchProblem from "../search/search-name-problem";

export default function ContentProblem() {
	const {isSignedIn} = useUser();
	const {setConfig} = useUploadProblem();
	const {changeProblemState} = useProblemStore(state => state);
	const {getProblems, loading} = useGetProblems();
	const data = getProblems();
	useEffect(() => {
		setConfig({state: "All"});
	}, [isSignedIn]);

	useEffect(() => {
		if (loading) {
			changeProblemState([], loading);
		} else {
			changeProblemState(data, loading);
		}
	}, [loading, data]);

	return (
		<div className="w-full grid grid-cols-12 gap-8">
			<div className="col-span-full lg:col-span-1  w-full " />
			<div className="flex flex-col col-span-full lg:col-span-10 gap-2 md:gap-8">
				<div className="flex gap-2">
					<div className="flex md:hidden">
						<ColumnTable />
					</div>
					<div className="md:hidden">
						<SheetSearch />
					</div>
					<SearchProblem />
				</div>
				<ListProblem />
			</div>
			<div className="col-span-full lg:col-span-1   w-full " />
		</div>
	);
}
