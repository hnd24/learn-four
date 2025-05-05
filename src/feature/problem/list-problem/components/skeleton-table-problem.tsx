import {Skeleton} from "@/components/ui/skeleton";

type Props = {
	length?: number;
};

export default function SkeletonTableProblem({length = 10}: Props) {
	const lengthProblem = Array.from({length: 10}, (_, i) => i);
	console.log(lengthProblem);
	return (
		<div className="border rounded-lg shadow-lg p-4 flex flex-col gap-4">
			{/* <Skeleton className={`h-9 w-full rounded-none bg-gray-300`} />
			<Skeleton className={`h-9 w-full rounded-none  bg-gray-300`} />
			<Skeleton className={`h-9 w-full rounded-none  bg-gray-300`} /> */}
			<div className="w-full h-9" />
			<div className="w-full flex flex-col">
				{lengthProblem.map((_, index) => (
					<Skeleton key={index} className={`h-9 w-full rounded-none bg-gray-300 border-b`} />
				))}
			</div>
			<div className="w-full h-10 flex justify-center">
				<Skeleton className={`h-9 w-28 rounded-md bg-gray-300`} />
			</div>
		</div>
	);
}
