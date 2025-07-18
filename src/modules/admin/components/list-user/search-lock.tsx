'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useFilterUser} from '@/hook/search/use-filter-user';
import {Glasses, ListFilter, Lock} from 'lucide-react';

export default function SearchLock({className}: {className?: string}) {
	const {
		filter: {locked},
		setFilter,
	} = useFilterUser();

	return (
		<div className="flex gap-2 items-center">
			<span>State:</span>
			<Select defaultValue={locked} onValueChange={value => setFilter({locked: value})}>
				<SelectTrigger className={`${className}`}>
					<SelectValue placeholder="Select state" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">
						<div className="flex items-center gap-2">
							<ListFilter className="size-4" />
							<span>All</span>
						</div>
					</SelectItem>
					<SelectItem value="locked">
						<div className="flex items-center gap-2 text-red-500">
							<Lock className="size-4 text-red-500" />
							<span>Locked</span>
						</div>
					</SelectItem>
					<SelectItem value="unlocked">
						<div className="flex items-center gap-2 text-emerald-500">
							<Glasses className="size-4 text-emerald-500" />
							<span>Normal</span>
						</div>
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
