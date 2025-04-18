import {cn} from "@/lib/utils";

type Props = {
	className?: string;
};

export const EasyLevelIcon = ({className}: Props) => {
	return <div className={cn("w-4 h-1 rounded-lg bg-green-600", className)} />;
};

export const MediumLevelIcon = ({className}: Props) => {
	return <div className={cn("w-4 h-1 rounded-lg bg-orange-400", className)} />;
};

export const HardLevelIcon = ({className}: Props) => {
	return <div className={cn("w-4 h-1 rounded-lg bg-red-600", className)} />;
};

export const AllLevelIcon = ({className}: Props) => {
	return (
		<div className={cn("flex flex-col gap-0.5", className)}>
			<EasyLevelIcon className="h-0.5" />
			<MediumLevelIcon className="h-0.5" />
			<HardLevelIcon className="h-0.5" />
		</div>
	);
};
