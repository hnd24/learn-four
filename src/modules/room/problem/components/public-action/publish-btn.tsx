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
import {useUpdateProblem} from '@/hook/data/problem';
import {useAtomValue} from 'jotai';
import {CloudUpload, PencilLine} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../../convex/_generated/dataModel';
import {statusProblemAtom} from '../../atom/status';
import FormPublishProblem from './form-public';

type Props = {
	problemId: Id<'problems'>;
};

export const PublishButton = ({problemId}: Props) => {
	const {mutate: updateProblem, isPending} = useUpdateProblem();
	const [open, setOpen] = useState(false);
	const status = useAtomValue(statusProblemAtom);
	const onClick = () => {
		updateProblem(
			{problemId, status: 'private'},
			{
				onSuccess: () => {
					toast.success('Problem status updated to private');
				},
				onError: error => {
					toast.error(`Failed to update problem status`);
					console.log('⚙️ Error updating problem status:', error);
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
					<DialogTitle>Publish Problem</DialogTitle>
					<DialogDescription>
						Configure problem settings before publishing.
					</DialogDescription>
				</DialogHeader>

				<FormPublishProblem problemId={problemId} onClose={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};
