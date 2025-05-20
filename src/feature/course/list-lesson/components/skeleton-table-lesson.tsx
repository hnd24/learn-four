import {Skeleton} from "@/components/ui/skeleton";

type Props = {
	length?: number;
};

export default function SkeletonTableLesson({length = 10}: Props) {
	const lengthProblem = Array.from({length: length}, (_, i) => i);
	return (
		<div className="border rounded-lg shadow-lg p-4 flex flex-col gap-4">
			{/* <Skeleton className={`h-9 w-full rounded-none bg-gray-300`} />
			<Skeleton className={`h-9 w-full rounded-none  bg-gray-300`} />
			<Skeleton className={`h-9 w-full rounded-none  bg-gray-300`} /> */}
			<div className="w-full h-9" />
			<div className="w-full flex flex-col gap-0.5">
				{lengthProblem.map((_, index) => (
					<Skeleton key={index} className={`h-9 w-full rounded-none bg-gray-300 border-b`} />
				))}
			</div>
		</div>
	);
}
