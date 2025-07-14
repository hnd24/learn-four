'use client';

import {Input} from '@/components/ui/input';
import {useDebounce} from '@/hook/use-debounce';
import {Search} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useFilter} from '../../../../hook/search/use-filters';

export default function SearchName() {
	const {
		filter: {name},
		setFilter,
	} = useFilter();

	const [inputValue, setInputValue] = useState(name);
	const debouncedValue = useDebounce(inputValue, 500); // debounce sau 500ms

	useEffect(() => {
		setFilter({name: debouncedValue.trim()});
	}, [debouncedValue, setFilter]);

	return (
		<div className="md:min-w-80 relative w-full lg:w-64">
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
