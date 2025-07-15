'use client';

import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {useUpdateLesson} from '@/hook/data/lesson';
import {useAtomValue} from 'jotai';
import {CloudUpload, PencilLine} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../../convex/_generated/dataModel';
import {statusLessonAtom} from '../../atom/status';
import FormPublishLesson from './form-public';

type Props = {
	lessonId: Id<'lessons'>;
};

export default function PublishButton({lessonId}: Props) {
	const {mutate: updateLesson, isPending} = useUpdateLesson();
	const [open, setOpen] = useState(false);
	const status = useAtomValue(statusLessonAtom);
	const onClick = () => {
		updateLesson(
			{lessonId, status: 'private'},
			{
				onSuccess: () => {
					toast.success('Lesson status updated to private');
				},
				onError: error => {
					toast.error(`Failed to update Lesson status`);
					console.log('⚙️ Error updating Lesson status:', error);
				},
			},
		);
	};
	if (status === 'public') {
		return (
			<Button onClick={onClick} disabled={isPending}>
				<PencilLine />
				<span className="hidden sm:block">Edit</span>
			</Button>
		);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" disabled={isPending}>
					<CloudUpload />
					<span className="hidden sm:block">Publish</span>
				</Button>
			</DialogTrigger>
			<DialogContent onEscapeKeyDown={e => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Publish Lesson</DialogTitle>
					<DialogDescription>
						Configure lesson settings before publishing.
					</DialogDescription>
				</DialogHeader>

				<FormPublishLesson lessonId={lessonId} onClose={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
