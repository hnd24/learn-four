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
import {DefaultPage, Language} from "@/constants";

import {cn} from "@/lib/utils";
import {ArrowBigRight, Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import SwitchTheme from "./switch-theme";

export default function SheetCostume() {
	const [language, setLanguage] = useState(Language.english.value);
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
					<div className="flex flex-col py-2">
						{Object.values(DefaultPage).map(({path, name}, index) => {
							return (
								<Link
									key={index}
									href={path}
									className={cn(
										"flex items-center gap-2 text-xl pb-2 font-semibold  my-2 ",
										pathNameCurrent === path && "text-deepBlue ",
									)}>
									<ArrowBigRight
										className={cn("text-gray-900", pathNameCurrent === path && "text-deepBlue")}
									/>
									<span>{name}</span>
								</Link>
							);
						})}
					</div>
					<div className="flex flex-col border-t-2 pl-4"></div>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger
								className="text-xl py-2 pr-2 font-semibold   rounded-none "
								classNameTrigger="size-6 ">
								Language
							</AccordionTrigger>
							<AccordionContent className="flex flex-col pl-4 relative">
								{Object.values(Language).map(({value, image, label}, index) => {
									return (
										<div
											onClick={() => {
												setLanguage(value);
											}}
											key={index}
											className={cn(
												"flex items-center gap-2 text-xl pb-2 font-semibold  my-2 border-b-2  ",
												language === value ? "text-deepBlue border-deepBlue" : "border-gray-300",
											)}>
											<Image src={image} alt="Việt Nam" height={30} width={30} />
											<span>{label}</span>
										</div>
									);
								})}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
				<div className="absolute bottom-4 right-4 left-4 w-full max-w-11/12 border-t-2 border-gray-300">
					<SwitchTheme word />
				</div>
			</SheetContent>
		</Sheet>
	);
}
