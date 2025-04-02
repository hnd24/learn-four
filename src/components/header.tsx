"use client";
import Logo from "@/components/logo";
import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import PageLink from "./page-link";
import SwitchLanguage from "./switch-language";

export default function HeaderHome() {
	const pathNameCurrent = usePathname();
	return (
		<div className="w-full h-[76px] p-4 flex items-center justify-between border-2 rounded-lg shadow-xl">
			<div className="flex items-center gap-10 h-full">
				<Logo />
				<div className="flex items-center justify-center gap-6 h-full">
					<PageLink pathName="/" pathNameCurrent={pathNameCurrent} name="Learning" />
					<PageLink pathName="/problem" pathNameCurrent={pathNameCurrent} name="Problem" />
					<PageLink pathName="/about" pathNameCurrent={pathNameCurrent} name="About" />
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div>
					<SwitchLanguage />
				</div>

				<div>
					<SignedOut>
						<SignInButton mode="modal">
							<Button
								className=" font-semibold px-5 py-4 rounded-full 
							bg-deepBlue hover:bg-deepBlueHover cursor-pointer hoverEffect">
								Log In
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</div>
	);
}
