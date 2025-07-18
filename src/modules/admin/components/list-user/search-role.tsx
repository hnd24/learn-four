'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useFilterUser} from '@/hook/search/use-filter-user';

export default function SearchRole({className}: {className?: string}) {
	const {
		filter: {role},
		setFilter,
	} = useFilterUser();
	return (
		<div className=" flex gap-2 items-center">
			<span>Role:</span>
			<Select defaultValue={role} onValueChange={value => setFilter({role: value})}>
				<SelectTrigger className={`${className}`}>
					<SelectValue placeholder="Level" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={'all'}>All</SelectItem>
					<SelectItem value={'admin'}>Admin</SelectItem>
					<SelectItem value={'user'}>User</SelectItem>
					<SelectItem value={'super_admin'}>Super Admin</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
