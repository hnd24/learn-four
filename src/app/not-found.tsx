'use client';

import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
	return (
		<div
			className="h-screen bg-whiteLight dark:
      w-full flex flex-col justify-center items-center gap-4">
			<Image
				src={`/images/not-found.svg`}
				alt="Logo"
				width={300}
				height={300}
				className="bg-black rounded-full w-80 h-[300px] dark:bg-transparent"
			/>
			<div className="text-2xl  text-center">Not Found!!!</div>
			<Link href="/">
				<Button className=" rounded-xl w-32 ">Return Home</Button>
			</Link>
		</div>
	);
}
