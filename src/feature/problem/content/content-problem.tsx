"use client";

import {useGetProblems} from "@/data/problem";
import {useUploadProblem} from "@/hook/use-upload-problem";
import {useProblemStore} from "@/providers/problem-store-provider";
import {useEffect} from "react";
import SheetSearch from "../components/sheet-search";
import ColumnTable from "../list-problem/components/column-table";
import ListProblem from "../list-problem/list-problem";
import SearchProblem from "../search/search-problem";

export default function ContentProblem() {
	const {setConfig} = useUploadProblem();
	const {changeProblemState} = useProblemStore(state => state);
	const {getProblems, loading} = useGetProblems();

	useEffect(() => {
		setConfig({loading});
	}, [loading]);

	useEffect(() => {
		if (loading) return;
		changeProblemState(getProblems({}));
	}, [loading, getProblems({})]);

	return (
		<div className="w-full grid grid-cols-12 gap-8">
			<div className="flex flex-col col-span-full 2xl:col-span-8 gap-2 xs:gap-8">
				<div className="flex gap-2">
					<div className="flex xs:hidden">
						<ColumnTable />
					</div>
					<div className="xs:hidden">
						<SheetSearch />
					</div>
					<SearchProblem />
				</div>
				<ListProblem />
			</div>
			<div className="col-span-full 2xl:col-span-4 bg-amber-400 h-12 w-full "></div>
		</div>
	);
}
