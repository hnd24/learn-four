import {cn} from "@/lib/utils";
import Link from "next/link";

type Props = {
	pathName: string;
	pathNameCurrent: string;
	name: string;
};

export default function PageLink({pathName, pathNameCurrent, name}: Props) {
	return (
		<Link
			href={pathName}
			className={cn(
				`hover:text-darkColor hoverEffect relative group text-xl font-semibold h-full
        flex items-center justify-center hover:`,
				pathName === pathNameCurrent && "text-pulseBlue",
			)}>
			<span>{name}</span>
			<span
				className={cn(
					"absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black",
					"hoverEffect group-hover:w-1/2 group-hover:left-0",
					pathName === pathNameCurrent && "w-1/2 left-0 bg-pulseBlue",
				)}
			/>
			<span
				className={cn(
					" absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black",
					"hoverEffect group-hover:w-1/2 group-hover:right-0",
					pathName === pathNameCurrent && "w-1/2 right-0 bg-pulseBlue",
				)}
			/>
		</Link>
	);
}
