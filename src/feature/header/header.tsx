"use client";
import {Button} from "@/components/ui/button";
import {DefaultPage} from "@/constants";
import Logo from "@/feature/header/logo";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {LogIn} from "lucide-react";
import {usePathname} from "next/navigation";
import SheetCostume from "../../components/sheet-costume";
import PageLink from "./page-link";
import SwitchLanguage from "./switch-language";

export default function HeaderHome() {
	const pathNameCurrent = usePathname();
	return (
		<div className=" w-full h-[76px] bg-white pr-2 flex items-center justify-between border-2 border-gray-100  shadow-xl md:px-4 md:rounded-lg">
			<div className="flex items-center gap-10 h-full">
				<Logo />
				<div className="md:flex hidden items-center justify-center gap-6 h-full">
					{Object.values(DefaultPage).map(({path, name}, index) => {
						return (
							<PageLink key={index} pathName={path} pathNameCurrent={pathNameCurrent} name={name} />
						);
					})}
				</div>
			</div>
			<div className="flex items-center gap-2 md:gap-4">
				<div className="md:flex hidden">
					<SwitchLanguage />
				</div>
				<div>
					<SignedOut>
						<SignInButton mode="modal">
							<Button
								className=" font-semibold px-5 py-4 rounded-full 
							bg-deepBlue hover:bg-darkDeepBlue cursor-pointer hoverEffect">
								<span className="md:flex hidden">Log In</span>
								<LogIn className="flex md:hidden" />
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<div className="h-full flex items-center">
							<UserButton />
						</div>
					</SignedIn>
				</div>
				<div className="flex md:hidden">
					<SheetCostume />
				</div>
			</div>
		</div>
	);
}
