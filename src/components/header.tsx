"use client";
import Logo from "@/components/logo";
import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {LogIn} from "lucide-react";
import {usePathname} from "next/navigation";
import PageLink from "./page-link";
import SidebarCostume from "./sidebar-costume";
import SwitchLanguage from "./switch-language";
import SwitchTheme from "./switch-theme";

export default function HeaderHome() {
	const pathNameCurrent = usePathname();
	return (
		<div
			className="w-full h-[76px] px-2 flex items-center justify-between border-2  shadow-xl
		md:px-4 md:rounded-lg">
			<div className="flex items-center gap-10 h-full">
				<Logo />
				<div className="md:flex hidden items-center justify-center gap-6 h-full">
					<PageLink pathName="/" pathNameCurrent={pathNameCurrent} name="Learning" />
					<PageLink pathName="/problem" pathNameCurrent={pathNameCurrent} name="Problem" />
					<PageLink pathName="/about" pathNameCurrent={pathNameCurrent} name="About" />
				</div>
			</div>
			<div className="flex items-center gap-2 md:gap-4">
				<SwitchTheme className="w-fit rounded-full border-2 border-white" size={20} />
				<div className="md:flex hidden">
					<SwitchLanguage />
				</div>
				<div>
					<SignedOut>
						<SignInButton mode="modal">
							<Button
								className=" font-semibold px-5 py-4 rounded-full 
							bg-deepBlue hover:bg-deepBlueHover cursor-pointer hoverEffect">
								<span className="md:flex hidden">Log In</span>
								<LogIn className="flex md:hidden" />
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
				<div className="flex md:hidden">
					<SidebarCostume />
				</div>
			</div>
		</div>
	);
}
