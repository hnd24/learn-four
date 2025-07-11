'use client';
import {Hint} from '@/components/hint';
import {LevelIcon} from '@/components/level-icon';
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
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Textarea} from '@/components/ui/textarea';
import {useGetDetailCourse, useUpdateCourse} from '@/hook/data/course';
import {useAddLesson, useGetLessonsByCourseId} from '@/hook/data/lesson';
import {cn} from '@/lib/utils';
import {CourseDetailType, LessonType, STATUS_COURSE} from '@/types';
import {isEqual} from 'lodash';
import {Loader2, Lock, PersonStanding, Plus} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';
import CourseBanner from './course-banner';
import CourseLogo from './course-logo';
import CourseName from './course-name';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	idCourse: Id<'courses'>;
};

export default function DialogCourse({isOpen, onClose, idCourse}: Props) {
	const {isPending: loadingCourse, data: courseData} = useGetDetailCourse(idCourse);
	const {isPending: loadingLessons, data: lessonsData} = useGetLessonsByCourseId(idCourse);
	const {isPending: pendingUpdate, updateCourse} = useUpdateCourse();
	const {isPending: pendingAdd, addLesson} = useAddLesson();
	const [course, setCourse] = useState<CourseDetailType>();
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const router = useRouter();
	const disabled = loadingLessons || loadingCourse || !idCourse || !course;
	useEffect(() => {
		if (courseData) {
			setCourse(courseData);
		}
	}, [idCourse, courseData, loadingCourse]);
	useEffect(() => {
		if (lessonsData) {
			setLessons(lessonsData.lessons);
		}
	}, [idCourse, lessonsData, loadingLessons]);

	const handleUpdate = async () => {
		if (!course) return;
		if (isEqual(course, courseData)) {
			toast.error('No changes detected.');
			return;
		}
		await updateCourse(idCourse, {
			status: course.status as STATUS_COURSE,
			name: course.name,
			description: course.description,
			banner: course.banner,
			logo: course.logo,
		});
	};

	const handleAdd = async () => {
		await addLesson(idCourse);
	};

	if (!course && disabled) {
		return (
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Loading...</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						Please wait while we fetch the course details.
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button onClick={onClose} variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="lg:min-w-6xl max-h-[calc(100vh-48px)] overflow-y-auto my-auto p-6">
				<DialogHeader>
					<DialogTitle />
				</DialogHeader>
				{/* COURSE CONTENT */}
				<section className="flex flex-col  gap-4">
					{/* Course status */}
					<Tabs
						value={course.status || 'private'}
						onValueChange={value => {
							setCourse({
								...course,
								status: value as STATUS_COURSE,
							});
						}}
						className="w-[400px]">
						<TabsList>
							<TabsTrigger value="public">public</TabsTrigger>
							<TabsTrigger value="private">Private</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
						<div className="relative flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<div className="flex items-end space-x-2">
									<CourseLogo course={course} onChange={setCourse} />
									<CourseName course={course} onChange={setCourse} />
								</div>
								{/* Course description */}
								<Textarea
									onChange={e => {
										setCourse({
											...course,
											description: e.target.value,
										});
									}}
									value={course.description}
									className="size-full text-sm text-muted-foreground truncate-3line"
								/>
							</div>

							<div className="absolute bottom-0 left-0 flex gap-2 items-center">
								{/* Author */}
								<div className="flex items-center gap-2">
									<Hint label={`Author: ${course.authorName}`}>
										<Image
											width={28}
											height={28}
											alt={course.authorName}
											src={course.authorImage}
											className="size-7 rounded-full object-cover"
										/>
									</Hint>
								</div>
								{/* number of learners who joined the course */}
								<div className="border rounded-lg w-fit p-2 pr-3 py-1 flex items-end gap-2 text-sm text-muted-foreground">
									<PersonStanding /> <p>{course.learner} learners</p>
								</div>
							</div>
						</div>
						<CourseBanner course={course} onChange={setCourse} />
					</div>
					{/* CHANGE BUTTON */}
					<Button
						disabled={disabled || pendingUpdate}
						onClick={handleUpdate}
						className="w-fit flex self-end gap-2">
						{pendingUpdate && <Loader2 className=" animate-spin" />}
						Save content
					</Button>
				</section>

				<section className="flex flex-col gap-6">
					{/* Course Content */}
					<div>
						<h3 className="text-xl font-semibold ">Content</h3>
						<p className="text-muted-foreground">{course.document}</p>
					</div>

					{/* Lessons */}
					<div>
						<h3 className="text-xl  font-semibold mb-2">Lessons</h3>
						<Table>
							<TableHeader>
								<TableRow>
									{/* <TableHead className="w-6"></TableHead> */}
									<TableHead className="w-20 text-center">Level</TableHead>
									<TableHead>Name</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{lessons.map(lesson => (
									<TableRow
										key={lesson._id}
										className={cn('cursor-pointer')}
										onClick={() => {
											router.push(`/admin/room/lesson/${lesson._id}`);
										}}>
										{/* <TableCell>
											{lesson?.state === 'completed' && (
												<CircleCheckBig className="size-4 text-green-500" />
											)}
										</TableCell> */}
										<TableCell className="w-20 min-h-8 flex justify-center items-center">
											<LevelIcon level={lesson.level} />
										</TableCell>

										<TableCell>
											<div className="text-start flex items-center gap-2">
												{lesson.status === 'private' && (
													<Lock className=" size-3" />
												)}
												{lesson.name}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							{/* TODO: Add new lesson row */}
							<TableFooter>
								<TableRow className="mt-2 cursor-pointer">
									<TableCell colSpan={2} className="p-0">
										<Button
											variant="ghost"
											disabled={disabled || pendingAdd}
											onClick={handleAdd}
											className={cn(
												'mt-2 size-full bg-darkOceanBlue/15 hover:bg-darkAzureBlue/20 group ',
												disabled || (pendingAdd && 'bg-gray-400'),
											)}>
											{pendingAdd ? (
												<Loader2 className="animate-spin" />
											) : (
												<Plus className="text-leafyGreen mx-auto group-hover:scale-110" />
											)}
										</Button>
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</section>

				<DialogFooter className="mt-6">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
