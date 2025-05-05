"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Language} from "@/constants";
import Image from "next/image";
import {useState} from "react";

export default function SwitchLanguage() {
	const [language, setLanguage] = useState(Language.English.value);
	return (
		<Select
			value={language}
			onValueChange={value => {
				setLanguage(value);
			}}>
			<SelectTrigger className="min-w-40 w-fit border-2 outline-none">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(Language).map(({value, image, label}, index) => {
					return (
						<SelectItem key={index} value={value}>
							<div className="flex items-center gap-2">
								<Image src={image} alt={label} height={20} width={20} />
								<span>{label}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
