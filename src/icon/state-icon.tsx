import {cn} from "@/lib/utils";
import {CircleCheckBigIcon, CircleIcon} from "lucide-react";

type Props = {
	className?: string;
};

export function SolvedIcon({className}: Props) {
	return <CircleCheckBigIcon className={cn("text-green-600", className)} />;
}
export function UnsolvedIcon({className}: Props) {
	return <CircleIcon className={cn("text-yellow-400", className)} />;
}
