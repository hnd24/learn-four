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
		config: {stateColumn, levelColumn, nameColumn, topicColumn, starColumn},
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
				<DropdownMenuItem
					className=" relative"
					onClick={() => setConfig({stateColumn: !stateColumn})}>
					<span>State</span>
					<Check className={cn("hidden absolute right-2", stateColumn && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem
					className=" relative"
					onClick={() => setConfig({levelColumn: !levelColumn})}>
					<span>Level</span>
					<Check className={cn("hidden absolute right-2", levelColumn && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem
					className=" relative"
					onClick={() => setConfig({nameColumn: !nameColumn})}>
					<span>Name</span>
					<Check className={cn("hidden absolute right-2", nameColumn && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem
					className=" relative"
					onClick={() => setConfig({topicColumn: !topicColumn})}>
					<span>Topic</span>
					<Check className={cn("hidden absolute right-2", topicColumn && "flex")} />
				</DropdownMenuItem>
				<DropdownMenuItem
					className=" relative"
					onClick={() => setConfig({starColumn: !starColumn})}>
					<span>Star</span>
					<Check className={cn("hidden absolute right-2", starColumn && "flex")} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
