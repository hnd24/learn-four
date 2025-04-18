"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useTableProblem} from "@/hook/use-table-porblem";
import {cn} from "@/lib/utils";
import {Check, Menu} from "lucide-react";

export default function ColumnTable() {
	const {
		config: {stateRow, levelRow, nameRow, topicRow, starRow},
		setConfig,
	} = useTableProblem();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center justify-center size-9 rounded-md text-gray-100 bg-gray-800 hover:bg-gray-900 border-gray-100 shadow-lg cursor-pointer">
					<Menu className="size-6" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right">
				<DropdownMenuItem className=" relative" onClick={() => setConfig({stateRow: !stateRow})}>
					<span>State</span>
					<Check className={cn("hidden absolute right-2", stateRow && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem className=" relative" onClick={() => setConfig({levelRow: !levelRow})}>
					<span>Level</span>
					<Check className={cn("hidden absolute right-2", levelRow && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem className=" relative" onClick={() => setConfig({nameRow: !nameRow})}>
					<span>Name</span>
					<Check className={cn("hidden absolute right-2", nameRow && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem className=" relative" onClick={() => setConfig({topicRow: !topicRow})}>
					<span>Topic</span>
					<Check className={cn("hidden absolute right-2", topicRow && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem className=" relative" onClick={() => setConfig({starRow: !starRow})}>
					<span>Star</span>
					<Check className={cn("hidden absolute right-2", starRow && "flex")} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
