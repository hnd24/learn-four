import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {Skeleton} from '@/components/ui/skeleton';
import {Trash2} from 'lucide-react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export default function DialogSkeleton({isOpen, onClose}: Props) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='className="w-3d md:min-w-4xl lg:min-w-6xl max-h-[calc(100vh-48px)] overflow-y-auto my-auto p-6 "'>
				<DialogHeader>
					<DialogTitle>
						<Skeleton className="h-8 w-28 " />
					</DialogTitle>
				</DialogHeader>
				<section className="flex flex-col gap-4">
					<div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
						<div className="flex flex-col justify-between gap-4">
							<div className="flex flex-col gap-2">
								<div className="flex items-end space-x-2">
									<Skeleton className="size-7" />
									<Skeleton className="h-12 w-48" />
								</div>
								{/* Course description */}
								<Skeleton className="h-24 w-full" />
							</div>

							<div className=" flex gap-2 items-center">
								{/* Author */}
								<div className="flex items-center gap-2">
									<Skeleton className="size-7 " />
								</div>
								{/* number of learners who joined the course */}
								<Skeleton className="h-7 w-24" />
							</div>
						</div>
						<div className="ml-auto hidden lg:flex">
							<Skeleton className="w-64 h-40 rounded-md" />
						</div>
					</div>
					<div className="flex gap-2 items-end">
						<Skeleton className="h-8 w-28" />
						<Skeleton className="h-10 w-32" />
					</div>
				</section>
				<section className="flex flex-col gap-6 mt-4">
					{/* Course Content */}
					<div className="w-full flex flex-col gap-4">
						<Skeleton className="h-9 w-22" />
						<Skeleton className="h-7 w-3/4 " />
						<Skeleton className="h-7 w-1/3 " />
						<Skeleton className="h-7 w-1/2 " />
					</div>

					{/* Lessons */}
					<div className="w-full flex flex-col gap-4">
						<Skeleton className="h-9 w-22" />
						<div className="w-full flex flex-col gap-2">
							{Array.from({length: 5}).map((_, index) => (
								<SkeletonRow key={index} />
							))}
						</div>
					</div>
				</section>
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={onClose} variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button variant="destructive" disabled type="submit" className="gap-2 flex">
						<Trash2 /> Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

const SkeletonRow = () => (
	<div className="flex items-center gap-2">
		<Skeleton className="h-6 w-12 " />
		<Skeleton className="h-6 flex flex-1" />
	</div>
);
