'use client';

import {Logo} from '@/components/logo';
import {Button} from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {cn} from '@/lib/utils';
import {Menu} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import LanguagesManager from './languages-manager';
import TopicsManager from './topics-manager';

type PageType = {
	label: string;
	href: string;
};

const PAGES: Record<string, PageType> = {
	course: {
		label: 'Course',
		href: '/admin',
	},
	problem: {
		label: 'Problem',
		href: '/admin/problem',
	},
	user: {
		label: 'User',
		href: '/admin/user',
	},
};

export default function Navbar() {
	const pathname = usePathname();

	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="ghost" className="lg:hidden">
						<Menu />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>
							<Logo />
						</SheetTitle>
						<SheetDescription>Welcome to LearnFour! 🎉🎉🎉.</SheetDescription>
					</SheetHeader>
					<div className="border-t border-gray-200 dark:border-gray-700" />
					<div className="px-4">
						<nav className="flex flex-col items-start gap-4 text-base font-semibold">
							{Object.entries(PAGES).map(([key, value]) => (
								<Link key={key} href={value.href} className="px-3 py-1 ">
									<span
										className={cn(
											'z-10 relative',
											pathname === value.href && 'text-darkLeafyGreen',
										)}>
										{value.label}
									</span>
								</Link>
							))}
							<TopicsManager />
							<LanguagesManager />
							<Link href={'/admin'} className="w-full">
								<Button className="z-10 w-full">Return Admin Page</Button>
							</Link>
						</nav>
					</div>
				</SheetContent>
			</Sheet>

			<div className="hidden lg:block">
				<NavbarContent pathname={pathname} />
			</div>
		</>
	);
}

export const NavbarContent = ({pathname = 'course'}: {pathname: string}) => {
	return (
		<nav className="hidden lg:flex items-center gap-6 text-base font-semibold">
			{Object.entries(PAGES).map(([key, value]) => (
				<Link
					key={key}
					href={value.href}
					className={cn(
						' px-3 py-1 rounded transition-colors duration-200 font-bold hover:bg-gray-900 hover:text-white',
						pathname === value.href &&
							'bg-gradient-to-r from-darkOceanBlue to-darkLeafyGreen text-white',
					)}>
					<span className="z-10 relative">{value.label}</span>
				</Link>
			))}
		</nav>
	);
};
