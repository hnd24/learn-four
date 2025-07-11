'use client';
import {Button} from '@/components/ui/button';
import {useGetCourses} from '@/hook/data/course';
import {cn} from '@/lib/utils';
import {CourseStateType} from '@/types';
import {useUser} from '@clerk/nextjs';
import {Loader2, Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';
import {useFilter} from '../../hook/use-filters';
import DialogCourse from '../dialog-course';
import {CardSkeleton} from './card-seketon';
import CourseCard from './course-card';
import {DialogConfirm} from './dialog-confirm';

export default function ListCourseCard() {
	const {data, isPending: loading, error} = useGetCourses();

	const {
		filter: {status},
	} = useFilter();
	const [rawCourses, setRawCourses] = useState<CourseStateType[]>([]);
	const [courses, setCourses] = useState<CourseStateType[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [isAdd, setIsAdd] = useState<boolean>(false);
	const [idCourse, setIdCourse] = useState<Id<'courses'>>();
	const isDisabled = isPending || loading;
	const {user} = useUser();

	useEffect(() => {
		setRawCourses(data || []);
		setCourses(data || []);
	}, [data, loading]);

	useEffect(() => {
		if (error) {
			console.error('⚙️ Error fetching courses:', error);
			toast.error('Failed to load courses. Please try reload again.');
		}
	}, [error]);

	useEffect(() => {
		if (status === 'all') {
			setCourses(rawCourses);
		} else {
			const filtered = rawCourses.filter(course => course.status === status);
			setCourses(filtered);
		}
	}, [status, rawCourses]);

	useEffect(() => {
		if (isOpen) setIsOpen(false);
	}, [isDisabled]);

	if (loading || !user || !user.id) {
		const randomArray = Array.from({length: 6}, (_, i) => i + 1);
		return (
			<div className=" mx-auto grid justify-center gap-4 sm:grid-cols-2  md:max-w-[82rem]  md:grid-cols-3 xl:grid-cols-4">
				{randomArray.map((item: number) => (
					<CardSkeleton key={item} />
				))}
			</div>
		);
	}
	return (
		<div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[82rem] md:grid-cols-3 xl:grid-cols-4">
			{courses.map(course => (
				<button
					className={cn('h-full text-start', isDisabled && 'grayscale')}
					disabled={isDisabled}
					key={course._id}
					onClick={() => {
						setIdCourse(course._id);
						setIsOpen(true);
					}}>
					<CourseCard course={course} />
				</button>
			))}
			{/* add course */}
			<Button
				variant="outline"
				size="icon"
				onClick={() => {
					setIsAdd(true);
				}}
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
			{idCourse && (
				<DialogCourse
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
					}}
					idCourse={idCourse}
				/>
			)}
			<DialogConfirm
				userId={user?.id || ''}
				open={isAdd}
				setOpen={setIsAdd}
				setPending={setIsPending}
			/>
		</div>
	);
}
