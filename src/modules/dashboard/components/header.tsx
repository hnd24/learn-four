'use client';

import CustomUserBtn from '@/components/custom-user-btn';
import {Logo} from '@/components/logo';
import SwitchTheme from '@/components/switch-theme';

export default function Header() {
	return (
		<header className=" h-16 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="flex h-full w-full items-center justify-between px-4">
				<Logo />
				<div className="flex items-center gap-3">
					{/* <ClientOnly>
						<UserButton appearance={{elements: {avatarBox: '!size-8'}}} />
					</ClientOnly> */}
					<CustomUserBtn />
					<SwitchTheme className="size-9 rounded-full border-2" />
				</div>
			</div>
		</header>
	);
}
