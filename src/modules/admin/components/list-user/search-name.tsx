'use client';

import {Input} from '@/components/ui/input';
import {useFilterUser} from '@/hook/search/use-filter-user';
import {useDebounce} from '@/hook/use-debounce';
import {Search} from 'lucide-react';
import {useEffect, useState} from 'react';

export default function SearchName({className}: {className?: string}) {
	const {
		filter: {name},
		setFilter,
	} = useFilterUser();

	const [inputValue, setInputValue] = useState(name);
	const debouncedValue = useDebounce(inputValue, 500);

	useEffect(() => {
		setFilter({name: debouncedValue.trim()});
	}, [debouncedValue, setFilter]);

	return (
		<div className={`relative w-full ${className}`}>
			<Input
				value={inputValue}
				placeholder="Search title..."
				onChange={e => setInputValue(e.target.value)}
				className="bg-primary-foreground pr-8"
			/>
			<Search className="hidden sm:flex text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2" />
		</div>
	);
}
