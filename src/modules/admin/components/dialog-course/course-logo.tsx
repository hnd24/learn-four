'use client';

import {DEFAULT_LOGO_URL} from '@/constants';
import {deleteFile} from '@/lib/delete-file';
import {uploadFile} from '@/lib/upload-file';
import {cn} from '@/lib/utils';
import {CourseDetailType} from '@/types';
import {Plus} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';

type Props = {
	course: CourseDetailType;
	onChange: (value: CourseDetailType) => void;
};

export default function CourseLogo({course, onChange}: Props) {
	const [isPending, setIsPending] = useState<boolean>(false);

	const handleChange = async (file: File) => {
		setIsPending(true);
		if (!file.type.includes('image/')) {
			toast.error('Please upload a valid image file.');
			return;
		}
		const url = await uploadFile(file);
		console.log('🚀 ~ handleChange ~ url:', url);
		if (course.logo) {
			await deleteFile(course.logo);
		}
		onChange({
			...course,
			logo: url,
		});
		setIsPending(false);
	};

	return (
		<>
			<input
				type="file"
				id="change-course-logo"
				className="hidden"
				onChange={e => {
					const file = e.target.files?.[0];
					if (!file) return;

					handleChange(file as File);
				}}
			/>
			<button
				type="button"
				disabled={isPending}
				onClick={() => document.getElementById('change-course-logo')?.click()}
				className="cursor-pointer group">
				{course.logo ? (
					<img
						alt={`icon ${course.name}`}
						src={course.logo || DEFAULT_LOGO_URL}
						width={28}
						height={28}
						className={cn(
							'size-7 group-hover:opacity-80',
							isPending && 'grayscale opacity-60',
						)}
					/>
				) : (
					<div className="size-7 grid place-items-center border-2 rounded-sm group">
						<Plus
							className={cn(
								'grid place-items-center size-3 group-hover:scale-125',
								isPending && 'grayscale opacity-60',
							)}
						/>
					</div>
				)}
			</button>
		</>
	);
}
