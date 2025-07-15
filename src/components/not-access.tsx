'use client';

import {cn} from '@/lib/utils';
import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from './ui/button';

type Props = {
	className?: string;
	children?: React.ReactNode;
	label?: string;
	link?: string;
	imageSrc?: StaticImport | string;
};

export default function NotAccessState({
	className,
	children,
	label = 'Access Denied',
	link = '/',
	imageSrc = '/images/not-access.svg',
}: Props) {
	return (
		<div className={cn('size-full flex flex-col gap-3 items-center justify-center', className)}>
			{children || (
				<Image
					src={imageSrc}
					alt="Logo"
					width={288}
					height={288}
					className="bg-black rounded-full  size-72 dark:bg-transparent"
				/>
			)}

			<p className="text-muted-foreground text-2xl">{label}</p>
			<Link href={link}>
				<Button className="  rounded-xl w-32 ">Go Back</Button>
			</Link>
		</div>
	);
}
