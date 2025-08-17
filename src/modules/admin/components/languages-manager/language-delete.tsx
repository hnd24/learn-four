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
import {useDeleteLanguage} from '@/hook/data/language';
import {Trash2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';

type Props = {
	languageId: Id<'languages'>;
	setDisabled: (disabled: boolean) => void;
};

export default function LanguageDelete({languageId, setDisabled}: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const {mutate: deleteLanguage, isPending: pendingDelete} = useDeleteLanguage();
	useEffect(() => {
		setDisabled(pendingDelete);
	}, [pendingDelete]);
	const handleDelete = (languageId: Id<'languages'>) => {
		deleteLanguage(
			{languageId},
			{
				onSuccess: () => {
					toast.success('Language deleted successfully');
					setDisabled(false);
				},
				onError: error => {
					toast.error(`Failed to delete language`);
					console.log('⚙️ Error deleting language:', error);
					setDisabled(false);
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
							handleDelete(languageId);
						}}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
