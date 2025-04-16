import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const listLanguage = [
	{
		value: "vietnamese",
		label: "Việt Nam",
		image: "/logo/vietnam-icon.svg",
	},
	{
		value: "english",
		label: "English",
		image: "/logo/us-icon.svg",
	},
];

export default function SwitchLanguage() {
	return (
		<Select defaultValue="vietnamese" onValueChange={value => console.log(value)}>
			<SelectTrigger className="min-w-40 w-fit border-2 outline-none">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent>
				{listLanguage.map((value, index) => {
					return (
						<SelectItem key={index} value={value.value}>
							<div className="flex items-center gap-2">
								<Image src={value.image} alt={value.label} height={20} width={20} />
								<span>{value.label}</span>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
