import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonListTestcase() {
	return (
		<div className="p-4">
			<div className="flex items-end gap-4 flex-wrap mb-6">
				<div className="flex flex-1 gap-3 flex-wrap">
					<Skeleton className="w-20 h-9 bg-gray-300" />
					<Skeleton className="w-20 h-9 bg-gray-300" />
					<Skeleton className="size-9 bg-gray-300" />
				</div>
				<div className="flex">
					<Skeleton className="size-9 bg-gray-300" />
				</div>
			</div>
			<div className="flex flex-col gap-8 w-full">
				<Skeleton className="h-10 bg-gray-300" />
				<Skeleton className="h-10 bg-gray-300" />
				<Skeleton className="h-10 bg-gray-300" />
			</div>
		</div>
	);
}
