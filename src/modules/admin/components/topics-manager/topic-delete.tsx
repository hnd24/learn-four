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
import {useDeleteTopic} from '@/hook/data/topic';
import {Trash2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';

type Props = {
	topicId: Id<'topics'>;
	setDisabled: (disabled: boolean) => void;
};

export default function TopicDelete({topicId, setDisabled}: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const {mutate: deleteTopic, isPending: pendingDelete} = useDeleteTopic();
	useEffect(() => {
		setDisabled(pendingDelete);
	}, [pendingDelete]);
	const handleDelete = (topicId: Id<'topics'>) => {
		deleteTopic(
			{topicId},
			{
				onSuccess: () => {
					toast.success('Topic deleted successfully');
				},
				onError: error => {
					toast.error(`Failed to delete topic`);
					console.error('⚙️ Error deleting topic:', error);
				},
			},
		);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<Trash2 className="h-4 w-4 text-destructive" />
					<span className="sr-only">Delete</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Deletion</DialogTitle>
					<DialogDescription>Are you sure ?.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						variant="destructive"
						onClick={() => {
							handleDelete(topicId);
						}}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
