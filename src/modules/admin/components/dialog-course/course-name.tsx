'use client';

import {Input} from '@/components/ui/input';
import {CourseDetailType} from '@/types';
import {SquarePen} from 'lucide-react';
import {useState} from 'react';

type Props = {
	course: CourseDetailType;
	onChange: (value: CourseDetailType) => void;
};

export default function CourseName({course, onChange}: Props) {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	if (isEditing) {
		return (
			<Input
				className="w-full rounded border bg-transparent px-2 py-1 text-sm font-semibold focus:border-blue-500 focus:outline-none"
				type="text"
				value={course.name}
				onChange={e =>
					onChange({
						...course,
						name: e.target.value,
					})
				}
				autoFocus
				onKeyDown={e => {
					if (e.key === 'Escape') {
						setIsEditing(false);
					}
					if (e.key === 'Enter') {
						setIsEditing(false);
					}
				}}
				onFocus={e => e.target.select()}
				onBlur={() => {
					setIsEditing(false);
				}}
			/>
		);
	}

	return (
		<div className="flex h-full  gap-x-2">
			<h2 className=" self-end text-lg md:text-2xl leading-6 font-bold truncate">
				{course.name || 'Name Course'}
			</h2>
			{!isEditing && (
				<SquarePen
					className=" self-center text-muted-foreground size-4 shrink-0 cursor-pointer hover:text-white"
					onClick={() => setIsEditing(true)}
				/>
			)}
		</div>
	);
}
