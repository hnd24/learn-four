import {cn} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	className?: HTMLSpanElement['className'];
	link?: string;
};

export const Logo = ({className, link = '/'}: Props) => {
	return (
		<Link href={link} className="mr-4 flex items-center gap-2 hover:opacity-80">
			<Image
				src="/icon/logo.svg"
				alt="Code Quest Logo"
				width={28}
				height={28}
				className="size-7"
			/>
			{
				<span className={cn('text-lg font-bold whitespace-nowrap', className)}>
					Learn Four
				</span>
			}
		</Link>
	);
};
