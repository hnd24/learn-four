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

import {Input} from "@/components/ui/input";
import {DifficultLevelProblem, StarProblem, StateProblem, TopicProblem} from "@/constants";
import {useUploadProblem} from "@/hook/use-upload-problem";
import {cn} from "@/lib/utils";
import {useState} from "react";
import SearchButton from "./search-button";

export default function SheetSearch() {
	const [open, setOpen] = useState(false);
	const {
		config: {topic, difficultyLevel, star, state},
		setConfig,
	} = useUploadProblem();
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>
				<div
					onClick={() => setOpen(true)}
					className="bg-deepBlue py-2 px-4 text-gray-100 border rounded-lg shadow-lg">
					Search
				</div>
			</SheetTrigger>
			<SheetContent side="left" className="gap-0">
				<SheetHeader>
					<SheetTitle className="text-2xl font-bold ">Learn Four</SheetTitle>
					<SheetDescription>
						<span className="text-sm text-gray-600 ">
							You can search and filter problems by name, tag, and difficulty level.
						</span>
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col border-t-2" />

				<div className="flex flex-col">
					<Accordion type="single" collapsible className="w-full">
						{/* Search Name Problem */}
						<AccordionItem value="item-1" className="flex flex-col px-2 py-2 gap-2">
							<span className="text-lg px-2 font-semibold">Name Problem</span>
							<Input
								className="text-base"
								onChange={e => setConfig({searchName: e.target.value.trim()})}
								placeholder="Search problem by name"
							/>
						</AccordionItem>
						{/* Search Topic Level Problem */}
						<AccordionItem value="item-2" className="px-4">
							<AccordionTrigger>
								<span className="text-lg font-semibold">Topic Problem</span>
							</AccordionTrigger>
							<AccordionContent>
								{Object.values(TopicProblem).map(({value}, index) => (
									<div
										onClick={() => {
											setConfig({topic: value});
										}}
										key={index}
										className={cn(
											"pl-4 py-1 font-sans text-base cursor-pointer rounded-lg",
											topic === value && "text-deepBlue bg-[#e3eefb]",
										)}>
										{value}
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
						{/* Search Difficulty Level Problem */}
						<AccordionItem value="item-3" className="px-4">
							<AccordionTrigger>
								<span className="text-lg font-semibold">Difficulty Level Problem</span>
							</AccordionTrigger>
							<AccordionContent>
								{Object.values(DifficultLevelProblem).map(({icon, value, label}, index) => {
									const Icon = icon;
									return (
										<div
											key={index}
											onClick={() => setConfig({difficultyLevel: value + ""})}
											className={cn(
												"flex items-center gap-2 font-sans text-base pl-4 py-1 cursor-pointer rounded-lg",
												difficultyLevel === value + "" && "text-deepBlue bg-[#e3eefb]",
											)}>
											<div className="flex items-center gap-2">
												<Icon />
												<span>{label}</span>
											</div>
										</div>
									);
								})}
							</AccordionContent>
						</AccordionItem>
						{/* Search State Problem */}
						<AccordionItem value="item-4" className="px-4">
							<AccordionTrigger>
								<span className="text-lg font-semibold">State Level Problem</span>
							</AccordionTrigger>
							<AccordionContent>
								{Object.values(StateProblem).map(({icon, value}, index) => {
									const Icon = icon;
									return (
										<div key={index} onClick={() => setConfig({state: value})}>
											<div
												className={cn(
													"flex items-center gap-2 font-sans text-base pl-4 py-1 cursor-pointer rounded-lg",
													state === value + "" && "text-deepBlue bg-[#e3eefb]",
												)}>
												<Icon className="size-4" />
												<span>{value}</span>
											</div>
										</div>
									);
								})}
							</AccordionContent>
						</AccordionItem>
						{/* Search Star Problem */}
						<AccordionItem value="item-5" className="px-4">
							<AccordionTrigger>
								<span className="text-lg font-semibold">Star Problem</span>
							</AccordionTrigger>
							<AccordionContent>
								{Object.values(StarProblem).map(({value, star, icon}, index) => {
									const Icon = icon;
									return (
										<div
											key={index}
											onClick={() => setConfig({star: value})}
											className={cn(
												"flex items-center gap-2 font-sans text-base pl-4 py-1 cursor-pointer rounded-lg",
												star === value && "text-deepBlue bg-[#e3eefb]",
											)}>
											<Icon />
											<span>{star}</span>
										</div>
									);
								})}
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<SearchButton className="text-lg" />
				</div>
			</SheetContent>
		</Sheet>
	);
}
