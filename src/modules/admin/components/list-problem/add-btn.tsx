'use client';

import {Button} from '@/components/ui/button';
import {useAddProblem} from '@/hook/data/problem';
import {AddProblemArgs} from '@/types';
import {Plus} from 'lucide-react';
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
			disabled={isPending}
			variant="outline"
			size="icon"
			onClick={handleAdd}
			className="w-full bg-darkOceanBlue/15 hover:bg-darkAzureBlue/20 group">
			<Plus className="text-leafyGreen mx-auto group-hover:scale-110" />
		</Button>
	);
}
