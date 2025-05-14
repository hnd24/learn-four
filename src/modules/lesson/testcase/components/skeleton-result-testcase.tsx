import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonResultTestcase() {
	return (
		<div className="p-4">
			<div className="flex flex-col gap-4 flex-wrap mb-4">
				<div className="flex items-end gap-3 flex-wrap">
					<Skeleton className="h-6 w-22 bg-gray-300 " />
					<Skeleton className="h-5 w-24 bg-gray-300 " />
				</div>
				<Skeleton className="h-5 w-40 bg-gray-300" />
				<div className="flex flex-wrap gap-3">
					<Skeleton className="w-20 h-8 bg-gray-300 " />
					<Skeleton className="w-20 h-8 bg-gray-300 " />
					<Skeleton className="w-20 h-8 bg-gray-300 " />
				</div>
			</div>
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-1">
						<Skeleton className="size-2 rounded-full bg-gray-300" />
						<Skeleton className="h-4 w-12 bg-gray-300" />
					</div>
					<Skeleton className="h-10 bg-gray-300" />
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-1">
						<Skeleton className="size-2 rounded-full bg-gray-300" />
						<Skeleton className="h-4 w-12 bg-gray-300" />
					</div>
					<Skeleton className="h-10 bg-gray-300" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-12 bg-gray-300 ml-2" />
					<Skeleton className="h-10 bg-gray-300" />
				</div>
			</div>
		</div>
	);
}
