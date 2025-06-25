'use client';

import {Input} from '@/components/ui/input';
import {Search} from 'lucide-react';
import {useFilter} from '../hook/use-filters';

export default function SearchName() {
	const {
		filter: {name},
		setFilter,
	} = useFilter();

	return (
		<div className="relative w-full lg:w-64">
			<Input
				defaultValue={name}
				placeholder="Search title..."
				onChange={e => {
					if (!e.target.value.trim()) {
						setFilter({name: e.target.value.trim()});
					}
				}}
				className="bg-primary-foreground pr-8"
				onFocus={e => e.target.select()}
			/>
			<Search className="hidden sm:flex text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2" />
		</div>
	);
}
