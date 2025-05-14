import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonListTestcase() {
	return (
		<div className="p-4">
			<div className="flex items-end gap-4 flex-wrap mb-6">
				<div className="flex flex-1 gap-3 flex-wrap">
					<Skeleton className="size-8 bg-gray-300" />
					<Skeleton className="size-8 bg-gray-300" />
					<Skeleton className="size-8 bg-gray-300" />
				</div>
				<div className="flex">
					<Skeleton className="size-9 bg-gray-300" />
				</div>
			</div>
			<div className="flex flex-col gap-8 w-full">
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-12 bg-gray-300 ml-2" />
					<Skeleton className="h-10 bg-gray-300" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-12 bg-gray-300 ml-2" />
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
