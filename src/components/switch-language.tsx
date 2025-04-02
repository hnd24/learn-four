import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function SwitchLanguage() {
	return (
		<Select defaultValue="vietnamese" onValueChange={value => console.log(value)}>
			<SelectTrigger className="min-w-40 w-fit border-2 outline-none">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="vietnamese">
					<div className="flex items-center gap-2">
						<Image src={"/images/viet-nam-flag.png"} alt="Việt Nam" height={30} width={30} />
						<span>Việt Nam</span>
					</div>
				</SelectItem>
				<SelectItem value="english">
					<div className="flex items-center gap-3 px-1">
						<Image
							src={"/images/united-states-flag.png"}
							alt="United States"
							height={20}
							width={20}
							className="size-fit bg-white rounded-full "
						/>
						<span>English</span>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
