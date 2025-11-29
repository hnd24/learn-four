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
import {cn} from '@/lib/utils';
import {AddCourseArgs} from '@/types';
import {DialogTrigger} from '@radix-ui/react-dialog';
import {Blocks, Loader2, Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';

type PropsDialogConfirm = {
	setPending: (value: boolean) => void;
};

export const AddCourseBtn = ({setPending}: PropsDialogConfirm) => {
	const [open, setOpen] = useState(false);
	const {mutate: addCourse, isPending} = useAddCourse();
	const {data: languages, isPending: loadingLanguages} = useGetLanguages();
	const JS = languages?.find(lang => lang.value === 'javascript');
	const disable = isPending || loadingLanguages;
	// const document = nanoid(60);
	const courseDefault: AddCourseArgs = {
		description: '',
		banner: '',
		name: '',
		document: '',
		status: 'private',
		logo: '',
		languageId: JS?._id || ('' as Id<'languages'>),
	};
	useEffect(() => {
		setPending(isPending);
	}, [setPending]);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className={cn(
						'size-full min-h-40 cursor-pointer shadow-leafyGreen bg-darkOceanBlue/20 group',
						'hover:scale-[1.01] hover:bg-darkOceanBlue/30 hover:shadow-md transition-transform',
						isPending && 'grayscale opacity-60',
					)}>
					{isPending ? (
						<Loader2 className="size-16 animate-spin " />
					) : (
						<Plus className="size-16 group-hover:scale-110 transition-transform text-leafyGreen " />
					)}
				</Button>
			</DialogTrigger>
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
