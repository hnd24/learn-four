'use client';

import {Button} from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';
import Link from 'next/link';
import {Logo} from '../../../components/logo';
import {NAVIGATION_ITEMS} from '../constants';

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
	e.preventDefault();
	const targetId = href.split('#')[1];
	const targetElement = document.getElementById(targetId);
	if (targetElement) {
		targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
};

export const Navbar = () => {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="ghost" className="md:hidden">
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
							{NAVIGATION_ITEMS.map(item => (
								<Link
									key={item.href}
									href={item.href}
									onClick={e => handleNavClick(e, item.href)}
									className="px-3 py-1 ">
									<span className="z-10 relative">{item.label}</span>
								</Link>
							))}
						</nav>
					</div>
				</SheetContent>
			</Sheet>

			<div className="hidden md:block">
				<NavbarContent />
			</div>
		</>
	);
};

export const NavbarContent = () => {
	return (
		<nav className="hidden md:flex items-center gap-6 text-base font-semibold">
			{NAVIGATION_ITEMS.map(item => (
				<Link
					key={item.href}
					href={item.href}
					onClick={e => handleNavClick(e, item.href)}
					className="relative px-3 py-1 rounded transition-colors duration-200 hover:bg-gradient-to-r hover:from-darkOceanBlue hover:to-darkLeafyGreen hover:text-white ">
					<span className="z-10 relative">{item.label}</span>
					<span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-darkOceanBlue to-darkLeafyGreen scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
				</Link>
			))}
		</nav>
	);
};
