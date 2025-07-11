import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

export function CardSkeleton() {
	return (
		<Card className="h-40 relative overflow-hidden shadow-leafyGreen ">
			<CardHeader>
				<div className="flex items-center space-x-2">
					<Skeleton className="size-7 rounded-full bg-gray-300" />

					<Skeleton className="h-6 w-20 bg-gray-300" />
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-1">
				<Skeleton className="h-4 w-52 bg-gray-300" />
				<Skeleton className="h-4 w-32 bg-gray-300" />
				<Skeleton className="h-4 w-40 bg-gray-300" />
			</CardContent>
		</Card>
	);
}
