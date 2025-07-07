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
import {STATUS_PROBLEM} from '@/types';
import {CloudUpload, PencilLine} from 'lucide-react';
import {useState} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';
import FormPublishProblem from './form-public';

type Props = {
	problemId: Id<'problems'>;
	status: STATUS_PROBLEM;
};

export const PublishButton = ({problemId, status}: Props) => {
	const {updateProblem, loading} = useUpdateProblem();
	const [open, setOpen] = useState(false);

	const onClick = async () => {
		await updateProblem(problemId, {status: 'private'});
	};

	if (status === 'public') {
		return (
			<Button onClick={onClick} disabled={loading}>
				<PencilLine />
				<span className="hidden sm:block">Edit</span>
			</Button>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" disabled={loading}>
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
