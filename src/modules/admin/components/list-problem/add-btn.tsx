'use client';

import {Button} from '@/components/ui/button';
import {useAddProblem} from '@/hook/data/problem';
import {cn} from '@/lib/utils';
import {AddProblemArgs} from '@/types';
import {Loader2, Plus} from 'lucide-react';
import {nanoid} from 'nanoid';
import {toast} from 'sonner';

export default function AddBtn() {
	const {mutate: addProblem, isPending} = useAddProblem();
	const document = nanoid(60);

	const problemDefault: AddProblemArgs = {
		name: 'New Problem',
		level: 'easy',
		document,
		answer: {},
		template: {},
		testcase: [],
		status: 'private',
	};
	const handleAdd = () => {
		addProblem(problemDefault, {
			onSuccess: () => {
				toast.success('Problem added successfully!');
			},
			onError: error => {
				toast.error('Failed to add problem ');
				console.error('⚙️ Error adding problem:', error);
			},
		});
	};
	return (
		<Button
			variant="ghost"
			disabled={isPending}
			onClick={handleAdd}
			className={cn(
				'w-full h-12 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-all duration-200',
				isPending && 'opacity-50 cursor-not-allowed',
			)}>
			{isPending ? (
				<div className="flex items-center gap-2">
					<Loader2 className="h-4 w-4 animate-spin" />
					<span>Adding problem...</span>
				</div>
			) : (
				<div className="flex items-center gap-2 text-blue-600">
					<Plus className="h-4 w-4" />
					<span>Add New problem</span>
				</div>
			)}
		</Button>
	);
}
