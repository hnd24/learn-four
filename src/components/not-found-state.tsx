'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	className?: string;
	children?: React.ReactNode;
	label?: string;
	link?: string;
	imageSrc?: StaticImport | string;
};

export default function NotFoundState({
	className,
	children,
	label = 'Not Found',
	link = '/',
	imageSrc = '/images/not-found.svg',
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
