'use client';

import {DEFAULT_BANNER_URL} from '@/constants';
import {deleteFile} from '@/lib/delete-file';
import {uploadFile} from '@/lib/upload-file';
import {cn} from '@/lib/utils';
import {CourseDetailType} from '@/types';
import {Plus} from 'lucide-react';
import Image from 'next/image';
import {useState} from 'react';
import {toast} from 'sonner';

type Props = {
	course: CourseDetailType;
	onChange: (value: CourseDetailType) => void;
};
export default function CourseBanner({course, onChange}: Props) {
	const [isPending, setIsPending] = useState<boolean>(false);

	const handleChange = async (file: File) => {
		setIsPending(true);
		if (!file.type.includes('image/')) {
			toast.error('Please upload a valid image file.');
			return;
		}
		const url = await uploadFile(file);
		if (course.banner) {
			await deleteFile(course.banner);
		}
		onChange({
			...course,
			banner: url,
		});
		setIsPending(false);
	};

	return (
		<>
			<input
				type="file"
				id="change-course-banner"
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
				onClick={() => document.getElementById('change-course-banner')?.click()}
				className="cursor-pointer group">
				{course.banner ? (
					<Image
						alt={`banner ${course.name}`}
						src={course.banner || DEFAULT_BANNER_URL}
						width={256}
						height={160}
						className={cn(
							'rounded-md object-cover w-64 h-40 group-hover:opacity-80',
							isPending && 'grayscale opacity-60',
						)}
					/>
				) : (
					<div className="w-64 h-40 grid place-items-center border-2 rounded-sm group">
						<Plus
							className={cn(
								'grid place-items-center size-8 group-hover:scale-125',
								isPending && 'grayscale opacity-60',
							)}
						/>
					</div>
				)}
			</button>
		</>
	);
}
