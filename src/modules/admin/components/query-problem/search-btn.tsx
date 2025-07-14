'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {Search} from 'lucide-react';

type Props = {
	className?: string;
};

export default function SearchBtn({className}: Props) {
	return (
		<Button className={cn('flex gap-4', className)}>
			<p className="hidden xs:flex">Search </p>
			<Search className="mx-1 xs:mx-0" />
		</Button>
	);
}
