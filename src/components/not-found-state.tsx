'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	className?: string;
	children?: React.ReactNode;
	label?: string;
	link?: string;
};

export default function NotFoundState({
	className,
	children,
	label = 'Not Found',
	link = '/',
}: Props) {
	return (
		<div className={cn('size-full flex flex-col gap-3 items-center justify-center', className)}>
			{children || (
				<Image
					src={`/images/not-found.svg`}
					alt="Logo"
					width={300}
					height={300}
					className="bg-black rounded-full  size-[300px] dark:bg-transparent"
				/>
			)}

			<p className="text-muted-foreground text-2xl">{label}</p>
			<Link href={link}>
				<Button className="  rounded-xl w-32 ">Go Back</Button>
			</Link>
		</div>
	);
}
