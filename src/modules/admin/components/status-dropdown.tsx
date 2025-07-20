'use client';
import {Button} from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useFilter} from '@/hook/search/use-filters';
import {cn} from '@/lib/utils';
import {ListIcon} from 'lucide-react';
import {STATUS_COURSE_ITEMS} from '../constants';

export default function StatusDropdown() {
	const {
		filter: {status},
		setFilter,
	} = useFilter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<ListIcon /> Type
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Object.entries(STATUS_COURSE_ITEMS).map(([key, value]) => (
					<DropdownMenuItem
						onClick={() => {
							setFilter({status: key});
						}}
						key={key}
						className={cn(
							'flex items-center gap-2',
							status === key && 'text-blue-500',
						)}>
						<value.icon className={cn('size-4', status === key && 'text-blue-500')} />
						{value.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
