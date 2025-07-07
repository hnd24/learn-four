'use client';

import {useUpdateProblem} from '@/hook/data/problem';
import {SquarePen} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';

type Props = {
	problemId: Id<'problems'>;
	title: string;
};

export default function Title({problemId, title}: Props) {
	const [value, setValue] = useState<string>(title || '');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const {updateProblem, loading} = useUpdateProblem();

	const onSubmit = () => {
		const updateTitle = async () => {
			await updateProblem(problemId, {name: value});
		};
		if (title === value || !value.trim()) {
			toast.error('Title cannot be empty or unchanged', {
				style: {color: 'red'},
			});
			return;
		}
		updateTitle();
	};
	if (loading) {
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
					disabled={loading}
				/>
			</form>
		);
	}

	return (
		<div className="flex h-full items-center justify-center gap-x-2">
			<h1 className="truncate font-semibold capitalize">{title}</h1>
			{!isEditing && (
				<SquarePen
					className="text-muted-foreground size-4 shrink-0 cursor-pointer hover:text-white"
					onClick={() => setIsEditing(true)}
				/>
			)}
		</div>
	);
}
