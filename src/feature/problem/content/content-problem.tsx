"use client";

import SheetSearch from "../components/sheet-search";
import ColumnTable from "../list-problem/components/column-table";
import TableProblem from "../list-problem/table-problem";
import SearchProblem from "../search/search-name-problem";

export default function ContentProblem() {
	return (
		<div className="w-full grid grid-cols-12 ">
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
				<TableProblem />
			</div>
			<div className="col-span-full lg:col-span-1   w-full " />
		</div>
	);
}
