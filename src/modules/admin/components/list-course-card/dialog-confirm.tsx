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
import {useAddCourse} from '@/hook/data/course';
import {useGetLanguages} from '@/hook/data/language';
import {AddCourseArgs} from '@/types';
import {Blocks, Loader2} from 'lucide-react';
import {nanoid} from 'nanoid';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';

type PropsDialogConfirm = {
	open: boolean;
	userId: string;
	setOpen: (value: boolean) => void;
	setPending: (value: boolean) => void;
};

export const DialogConfirm = ({open, setOpen, userId, setPending}: PropsDialogConfirm) => {
	const {mutate: addCourse, isPending} = useAddCourse();
	const {data: languages, isPending: loadingLanguages} = useGetLanguages();
	const JS = languages?.find(lang => lang.value === 'javascript');
	const disable = isPending || loadingLanguages;
	const document = nanoid(60);
	const courseDefault: AddCourseArgs = {
		description: '',
		banner: '',
		learner: 0,
		name: '',
		document,
		authorId: userId,
		status: 'private',
		logo: '',
		languageId: JS?._id || ('' as Id<'languages'>),
	};
	useEffect(() => {
		setPending(isPending);
	}, [setPending]);
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
							disabled={disable}
							variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button
						disabled={disable}
						onClick={() => {
							addCourse(
								{...courseDefault},
								{
									onSuccess: () => {
										setOpen(false);
										toast.success('Course added successfully.');
									},
									onError: error => {
										console.error('⚙️ Failed to add course:', error);
										toast.error(`Failed to add course: ${error.message}`);
									},
								},
							);
						}}>
						{isPending ? <Loader2 className="animate-spin" /> : <Blocks />}
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
