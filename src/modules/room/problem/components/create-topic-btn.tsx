'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useAddTopic} from '@/hook/data/topic';
import {Plus} from 'lucide-react';
import {useState} from 'react';
import {Id} from '../../../../../convex/_generated/dataModel';

type Props = {
	onClose: () => void;
	onChange: (value: Id<'topics'>) => void;
};
export default function CreateTopicBtn({onClose, onChange}: Props) {
	const {mutate: addTopic, isPending} = useAddTopic();
	const [value, setValue] = useState('');

	const onSubmit = () => {
		addTopic(
			{name: value, status: 'public'},
			{
				onSuccess: data => {
					if (!data) return;
					onChange(data as Id<'topics'>);
					setValue('');
					onClose();
					return;
				},
				onError: error => {
					console.error('⚙️ Error creating topic:', error);
				},
			},
		);

		return;
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && value.trim()) {
			e.preventDefault();
			onSubmit();
		}

		if (e.key === 'Escape') {
			e.stopPropagation();
			e.preventDefault();
			onClose();
		}
	};
	return (
		<div className="flex flex-col space-y-2">
			<div className="flex items-center space-x-2">
				<Input
					autoFocus
					value={value}
					onChange={e => setValue(e.target.value)}
					onKeyDown={onKeyDown}
					placeholder="Enter new category name"
				/>
				<Button onClick={onSubmit} disabled={isPending || !value.trim()} type="button">
					<Plus />
				</Button>
			</div>
		</div>
	);
}
