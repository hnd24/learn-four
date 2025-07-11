'use client';

import {LevelIcon} from '@/components/level-icon';
import {Button} from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {useAddLesson, useGetLessonsByCourseId} from '@/hook/data/lesson';
import {cn} from '@/lib/utils';
import {AddLessonArgs, LessonType} from '@/types';
import {Loader2, Lock, Plus} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';
type Props = {
	idCourse: Id<'courses'>;
	languageId: Id<'languages'>;
};

export default function CourseLessonList({idCourse, languageId}: Props) {
	const {isPending: loadingLessons, data: lessonsData} = useGetLessonsByCourseId(idCourse);
	const {isPending: pendingAdd, mutate: addLesson} = useAddLesson(idCourse);
	const disabled = loadingLessons || pendingAdd;
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const router = useRouter();
	const defaultArgs: AddLessonArgs = {
		courseId: idCourse,
		name: 'New Lesson',
		level: 'easy',
		content: '',
		answer: '',
		languageId,
		template: {
			head: '',
			body: '',
			tail: '',
		},
		testcase: [],
		status: 'private',
	};
	useEffect(() => {
		if (lessonsData) {
			setLessons(lessonsData.lessons);
		}
	}, [idCourse, lessonsData, loadingLessons]);
	const handleAdd = () => {
		addLesson(defaultArgs, {
			onSuccess: () => {
				toast.success('Lesson added successfully.');
			},
			onError: error => {
				console.error('⚙️ Failed to add lesson:', error);
				toast.error(`Failed to add lesson: ${error.message}`);
			},
		});
	};
	return (
		<div>
			<h3 className="text-xl  font-semibold mb-2">Lessons</h3>
			<Table className=" overflow-hidden">
				<TableHeader>
					<TableRow>
						{/* <TableHead className="w-6"></TableHead> */}
						<TableHead />
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
							<TableCell className="w-7 min-h-8  justify-center items-center">
								<LevelIcon level={lesson.level} />
							</TableCell>

							<TableCell className=" flex flex-1">
								<div className=" w-52 sm:w-auto text-start flex items-center gap-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
									{lesson.status === 'private' && <Lock className=" size-3" />}
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
	);
}
