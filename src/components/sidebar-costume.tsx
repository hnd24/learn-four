"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {listPageList} from "@/constants";

import {cn} from "@/lib/utils";
import {CircleArrowRight, Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import SwitchTheme from "./switch-theme";

export default function SidebarCostume() {
	const pathNameCurrent = usePathname();
	return (
		<Sheet>
			<SheetTrigger>
				<Menu size={32} className="text-deepBlue font-bold" />
			</SheetTrigger>
			<SheetContent className="gap-0">
				<SheetHeader>
					<SheetTitle className="  text-2xl font-bold ">Learn Four</SheetTitle>
					<SheetDescription>
						<span className="text-sm text-gray-600 ">
							Welcome, here you can learn and practice coding. 👉👈
						</span>
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col border-t-2 pl-4">
					{listPageList.map((item, index) => {
						return (
							<Link
								key={index}
								href={item.path}
								className={cn(
									"flex items-center gap-2 text-xl pb-2 font-semibold  my-2 border-b-2 border-gray-300",
									pathNameCurrent === item.path && "text-deepBlue border-deepBlue",
								)}>
								<CircleArrowRight
									className={cn("hidden", pathNameCurrent === item.path && "flex")}
								/>
								<span>{item.name}</span>
							</Link>
						);
					})}
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger
								className="text-xl py-2 pr-2 font-semibold border-b-2 border-gray-300 rounded-none"
								classNameTrigger="size-6 ">
								Language
							</AccordionTrigger>
							<AccordionContent className="flex flex-col pl-4 relative">
								<div
									className={cn(
										"flex items-center gap-2 text-xl pb-2 font-semibold  my-2 border-b-2 text-deepBlue border-deepBlue",
									)}>
									<Image src={"/images/viet-nam-flag.png"} alt="Việt Nam" height={30} width={30} />
									<span>Việt Nam</span>
								</div>
								<div
									className={cn(
										"flex items-center gap-2 text-xl pb-2 font-semibold  my-2 border-b-2 border-gray-300",
									)}>
									<Image
										src={"/images/united-states-flag.png"}
										alt="United States"
										height={20}
										width={20}
										className="size-fit bg-white rounded-full "
									/>
									<span>English</span>
								</div>
							</AccordionContent>
							<div className="absolute bottom-4 left-5 w-60 border-t-2 border-gray-300">
								<SwitchTheme word />
							</div>
						</AccordionItem>
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
}
