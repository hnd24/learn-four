'use client';

import {useUpdateLesson} from '@/hook/data/lesson';
import {useAtomValue} from 'jotai';
import {SquarePen} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';
import {statusLessonAtom} from '../atom/status';

type Props = {
	lessonId: Id<'lessons'>;
	title: string;
};

export default function Title({lessonId, title}: Props) {
	const [value, setValue] = useState<string>(title || '');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const {mutate: updateLesson, isPending} = useUpdateLesson();
	const status = useAtomValue(statusLessonAtom);

	const onSubmit = () => {
		const updateTitle = async () => {
			await updateLesson(
				{lessonId, name: value},
				{
					onSuccess: () => {
						toast.success('Problem title updated successfully');
						setIsEditing(false);
					},
					onError: error => {
						toast.error(`Failed to update problem title`);
						console.error('⚙️ Error updating problem title:', error);
					},
				},
			);
		};
		if (title === value || !value.trim()) {
			toast.error('Title cannot be empty or unchanged');
			return;
		}
		updateTitle();
	};
	if (isPending) {
		return (
			<div className="flex h-full items-center justify-center">
				<span className="text-muted-foreground">Loading...</span>
			</div>
		);
	}

	if (isEditing) {
		return (
			<form
				onSubmit={e => {
					e.preventDefault();
					onSubmit();
				}}>
				<input
					className="w-full rounded border bg-transparent px-2 py-1 text-sm font-semibold focus:border-blue-500 focus:outline-none"
					value={value}
					onChange={e => setValue(e.target.value)}
					autoFocus
					onKeyDown={e => {
						if (e.key === 'Escape') {
							setIsEditing(false);
						}
						if (e.key === 'Enter') {
							onSubmit();
							setIsEditing(false);
						}
					}}
					onFocus={e => e.target.select()}
					onBlur={() => {
						onSubmit();
						setIsEditing(false);
					}}
					disabled={isPending}
				/>
			</form>
		);
	}

	return (
		<div className="flex h-full items-center justify-center gap-x-2">
			<h1 className="truncate font-semibold capitalize">{title}</h1>
			{!isEditing && status === 'private' && (
				<SquarePen
					className="text-muted-foreground size-4 shrink-0 cursor-pointer hover:text-white"
					onClick={() => setIsEditing(true)}
				/>
			)}
		</div>
	);
}
