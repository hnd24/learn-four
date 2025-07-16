'use client';
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
import {useGetUserCourse, useJoinCourse, useUpdateCourse} from '@/hook/data/course';
import {CourseStateType} from '@/types';
import {Loader2, Pencil, ShieldMinus} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Id} from '../../../../convex/_generated/dataModel';

type Props = {
	courseId: Id<'courses'>;
	open: boolean;
	setOpen: (open: boolean) => void;
	course: CourseStateType;
};

export default function JoinCourseDialog({courseId, open, setOpen, course}: Props) {
	const {data: userCourse, isPending: loading} = useGetUserCourse(courseId);
	const {mutate: updateCourse, isPending: pendingUpdate} = useUpdateCourse();
	const {mutate: joinCourse, isPending} = useJoinCourse();
	const disabled = loading || isPending || pendingUpdate;
	const router = useRouter();
	const handleJoinCourse = () => {
		if (!userCourse) {
			joinCourse({courseId});
			updateCourse({
				courseId,
				learner: course.learner + 1,
			});
		}

		router.push(`/course/${courseId}`);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{loading ? (
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="flex gap-2 items-center">
							<Loader2 className="animate-spin size-7" />
							Course Loading...
						</DialogTitle>
						<DialogDescription>Loading course details...</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button disabled={true}>
							<ShieldMinus />
							Join
						</Button>
					</DialogFooter>
				</DialogContent>
			) : (
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="flex gap-2 items-center">
							<img
								src={course.logo}
								alt="course logo"
								width={28}
								height={28}
								className="size-7"
							/>
							Course {course.name}
						</DialogTitle>
						<DialogDescription>
							Start learning and practicing programming skills.
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button disabled={disabled} onClick={handleJoinCourse}>
							{disabled ? <Loader2 className=" animate-spin" /> : <Pencil />}
							Join
						</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
}

function DialogSkeleton({open, setOpen}: {open: boolean; setOpen: (open: boolean) => void}) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Loader2 className="animate-spin size-7" />
						Course Loading...
					</DialogTitle>
					<DialogDescription>Loading course details...</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button disabled={true}>
						<ShieldMinus />
						Join
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
