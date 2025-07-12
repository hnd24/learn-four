'use client';

import {Button} from '@/components/ui/button';
import {Search} from 'lucide-react';

export default function SearchBtn() {
	return (
		<Button className="flex gap-4">
			<p className="hidden xs:flex">Search </p>
			<Search className="mx-1 xs:mx-0" />
		</Button>
	);
}
