'use client';
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
import {useGetDetailCourse} from '@/hook/data/course';
import {cn} from '@/lib/utils';
import {CourseDetailType} from '@/types';
import {PersonStanding, Plus} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Id} from '../../../../convex/_generated/dataModel';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	idCourse: Id<'courses'>;
};

export default function DialogCourse({isOpen, onClose, idCourse}: Props) {
	const {isPending, data} = useGetDetailCourse(idCourse);
	const [course, setCourse] = useState<CourseDetailType | undefined>(undefined);
	const router = useRouter();
	const disabled = isPending || !idCourse || !course;
	useEffect(() => {
		if (data) {
			setCourse(data);
		}
	}, [idCourse, data, isPending]);
	if (disabled) {
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
				{/* header */}
				<DialogHeader>
					<DialogTitle />
				</DialogHeader>
				<header className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
					<section className="relative flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<div className="flex items-end space-x-2">
								<Image
									alt={`icon ${course.language}`}
									src={course.logo}
									width={28}
									height={28}
									className="size-7"
								/>

								<h2 className="text-2xl leading-6 font-bold">
									{course.language} Course
								</h2>
							</div>
							<p className="text-sm text-muted-foreground truncate-3line">
								{course.description}
							</p>
						</div>
						<div className=" absolute bottom-0 left-0 border rounded-lg w-fit p-2	pr-3 py-1 flex items-end gap-2 text-sm text-muted-foreground">
							<PersonStanding /> <p>{course.learner} learners</p>
						</div>
					</section>
					<Image
						alt="course banner"
						src={course.banner}
						width={400}
						height={200}
						className="ml-auto rounded-md object-cover w-64 h-40"
					/>
				</header>

				<section className="flex flex-col gap-6">
					{/* Course Content */}
					<div>
						<h3 className="text-xl font-semibold ">Content</h3>
						<p className="text-muted-foreground">{course.content}</p>
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
								{course.lessons.map(lesson => (
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

										<TableCell className="text-start">{lesson.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
							{/* TODO: Add new lesson row */}
							<TableFooter>
								<TableRow className="mt-2 cursor-pointer">
									<TableCell
										className="bg-darkOceanBlue/15 hover:bg-darkAzureBlue/20 group "
										colSpan={2}>
										<Plus className="text-leafyGreen mx-auto group-hover:scale-110" />
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
					<Button disabled={disabled} type="submit">
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
