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
} from '@/components/ui/dialog';
import {useDeleteCourse} from '@/hook/data/course';
import {deleteFile} from '@/lib/delete-file';
import {CourseDetailType} from '@/types';
import {Loader2, Trash2} from 'lucide-react';
import {toast} from 'sonner';
type Props = {
	open: boolean;
	setOpen: (value: boolean) => void;
	onClose: () => void;
	course: CourseDetailType;
};

export const DialogConfirm = ({open, course, onClose, setOpen}: Props) => {
	const {mutate: deleteCourse, isPending} = useDeleteCourse();
	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Action</DialogTitle>
				</DialogHeader>
				<DialogDescription>Are you sure ?</DialogDescription>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							onClick={() => {
								setOpen(false);
							}}
							disabled={isPending}
							variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() => {
							course.logo && deleteFile(course.logo);
							course.banner && deleteFile(course.banner);
							deleteCourse(
								{courseId: course._id},
								{
									onSuccess: () => {
										onClose();
										setOpen(false);
										toast.success('Course deleted successfully.');
									},
									onError: error => {
										console.error('⚙️ Failed to delete course:', error);
										toast.error(`Failed to delete course: ${error.message}`);
									},
								},
							);
						}}>
						{isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
