'use client';
import {Hint} from '@/components/hint';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Textarea} from '@/components/ui/textarea';
import {useGetDetailCourse, useUpdateCourse} from '@/hook/data/course';
import {CourseDetailType, STATUS_COURSE} from '@/types';
import {isEqual} from 'lodash';
import {Loader2, PersonStanding, Trash2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';
import {DialogConfirm} from './confirm-dialog';
import CourseBanner from './course-banner';
import CourseLessonList from './course-lesson-list';
import CourseLogo from './course-logo';
import CourseName from './course-name';
import DialogSkeleton from './dialog-sekeleton';
import LanguageSelect from './language-select';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	idCourse: Id<'courses'>;
};

export default function DialogCourse({isOpen, onClose, idCourse}: Props) {
	const {isPending: loadingCourse, data: courseData} = useGetDetailCourse(idCourse);
	const {isPending: pendingUpdate, mutate: updateCourse} = useUpdateCourse();
	const [course, setCourse] = useState<CourseDetailType>();
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const disabled = loadingCourse || !idCourse || !course;

	useEffect(() => {
		if (courseData) {
			setCourse(courseData);
		}
	}, [idCourse, courseData, loadingCourse]);

	const handleUpdate = () => {
		if (!course) return;
		if (isEqual(course, courseData)) {
			toast.error('No changes detected.');
			return;
		}
		if (
			(!course.name ||
				!course.description ||
				!course.banner ||
				!course.logo ||
				!course.language?._id ||
				!course.document) &&
			course.status === 'public'
		) {
			toast.error('Please fill in all required fields.');
			return;
		}
		updateCourse(
			{
				courseId: idCourse,
				status: course.status as STATUS_COURSE,
				name: course.name,
				description: course.description,
				banner: course.banner,
				logo: course.logo,
				languageId: course.language._id,
				document: course.document,
			},
			{
				onSuccess: () => {
					toast.success('Course updated successfully.');
				},
				onError: error => {
					console.error('⚙️ Failed to update course:', error);
					toast.error(`Failed to update course: ${error.message}`);
				},
			},
		);
	};

	if (!course && disabled) {
		return <DialogSkeleton isOpen={isOpen} onClose={onClose} />;
	}
	return (
		<>
			<Dialog open={isOpen}>
				<DialogContent className=" md:min-w-4xl lg:min-w-6xl max-h-[calc(100vh-48px)] overflow-y-auto my-auto p-6">
					<DialogHeader>
						<DialogTitle />
					</DialogHeader>
					<section className="flex flex-col  gap-4">
						<Tabs
							value={course.status || 'private'}
							onValueChange={value => {
								setCourse({
									...course,
									status: value as STATUS_COURSE,
								});
							}}>
							<TabsList>
								<TabsTrigger value="public">public</TabsTrigger>
								<TabsTrigger value="private">Private</TabsTrigger>
							</TabsList>
						</Tabs>
						<section className="flex flex-col gap-4 md:gap-6">
							<div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 ">
								<div className="flex flex-col justify-between gap-4">
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

									<div className=" flex gap-2 items-center">
										{/* Author */}
										<div className="flex items-center gap-2">
											<Hint label={`Author: ${course.authorName}`}>
												<Avatar>
													<AvatarImage
														src={course.authorImage}
														alt={course.authorName}
													/>
													<AvatarFallback>
														{course.authorName?.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
											</Hint>
										</div>
										{/* number of learners who joined the course */}
										<div className="border rounded-lg w-fit p-2 pr-3 py-1 flex items-center gap-2 text-sm text-muted-foreground">
											<PersonStanding className="size-4" />{' '}
											<p>{course.learner} learners</p>
										</div>
									</div>
								</div>
								<div className="ml-auto hidden lg:flex">
									<CourseBanner course={course} onChange={setCourse} />
								</div>
							</div>
							<LanguageSelect course={course} onChange={setCourse} />
							{/* Course Content */}
							<div className="flex flex-col gap-2">
								<h3 className="text-xl font-semibold ">Document</h3>
								<Textarea
									onChange={e => {
										setCourse({
											...course,
											document: e.target.value,
										});
									}}
									value={course.document}
									className="w-full min-h-60 text-base"
								/>
							</div>
						</section>

						{/* CHANGE BUTTON */}
						<Button
							disabled={disabled || pendingUpdate}
							onClick={handleUpdate}
							className="w-fit flex self-end gap-2">
							{pendingUpdate && <Loader2 className=" animate-spin" />}
							Save change
						</Button>
					</section>

					{/* Lessons */}
					<CourseLessonList idCourse={idCourse} languageId={course.language._id} />

					<DialogFooter className="mt-6">
						<DialogClose asChild>
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
						</DialogClose>
						<Button variant="destructive" onClick={() => setIsDelete(true)}>
							<Trash2 /> Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<DialogConfirm
				open={isDelete}
				setOpen={setIsDelete}
				onClose={onClose}
				course={course}
			/>
		</>
	);
}
