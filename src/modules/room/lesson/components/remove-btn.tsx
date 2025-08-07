'use client';
import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {useDeleteLesson} from '@/hook/data/lesson';
import {cn} from '@/lib/utils';
import {roleUserAtom} from '@/modules/admin/atom/role-user';
import {STATUS_LESSON} from '@/types';
import {useAtomValue} from 'jotai';
import {Loader2, Trash2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';

type Props = {
	lessonId: Id<'lessons'>;
	status: STATUS_LESSON;
};

export default function RemoveLessonBtn({lessonId, status}: Props) {
	const [open, setOpen] = useState(false);
	const {mutate: deleteLesson, isPending} = useDeleteLesson();
	const router = useRouter();
	const roleUser = useAtomValue(roleUserAtom);
	const isSuperAdmin = roleUser === 'super_admin';
	const handleDelete = () => {
		if (status === 'public') {
			toast.error('You cannot delete a public lesson.');
			return;
		}
		deleteLesson(
			{lessonId},
			{
				onSuccess: () => {
					setOpen(false);
					router.replace('/admin');
				},
				onError: error => {
					toast.error('Failed to delete lesson. Please try again.');
					console.error('⚙️ Error deleting lesson	:', error);
				},
			},
		);
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button
					size="icon"
					className={cn(
						' place-items-center bg-red-500 hover:bg-red-600 dark:hover:bg-red-400 ',
						isSuperAdmin ? 'grid' : 'hidden',
					)}
					variant="outline"
					disabled={isPending}
					onClick={() => setOpen(true)}>
					<Trash2 className="size-4 !text-white" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete Lesson</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this lesson? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</DialogClose>
					<Button
						onClick={handleDelete}
						variant="destructive"
						className="flex gap-2 items-center"
						disabled={isPending}>
						{isPending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<Trash2 className="size-4" />
						)}
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
