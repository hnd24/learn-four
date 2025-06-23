import {ClientOnly} from '@/components/client-only';
import {Hint} from '@/components/hint';
import {Logo} from '@/components/logo';
import {Button} from '@/components/ui/button';
import {UserButton} from '@clerk/nextjs';
import {Bell} from 'lucide-react';
import Navbar from './navbar';

export default function Header() {
	return (
		<header className="bg-background sticky top-0 z-50 w-full h-16 border-b backdrop-blur">
			<div className="flex size-full items-center">
				<div className="hidden lg:flex justify-center w-64 h-16 border-r">
					<Logo />
				</div>
				<div className="flex flex-1 px-6 items-center justify-between">
					{/* TODO: navbar */}
					<Navbar />
					<Hint label="coming soon">
						<div className="flex items-center gap-3">
							<ClientOnly>
								<UserButton appearance={{elements: {avatarBox: '!size-8'}}} />
							</ClientOnly>
							<Button
								variant="secondary"
								size="icon"
								className="hidden md:flex group">
								<Bell className=" group-hover:scale-105" />
							</Button>
						</div>
					</Hint>
				</div>
			</div>
		</header>
	);
}
