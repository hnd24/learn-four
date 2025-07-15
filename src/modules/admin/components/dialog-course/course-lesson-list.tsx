'use client';

import {LevelIcon} from '@/components/level-icon';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
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
import {
	BookOpen,
	ChevronRight,
	CircleCheckBig,
	Eye,
	EyeOff,
	Loader2,
	Lock,
	Plus,
} from 'lucide-react';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {Id} from '../../../../../convex/_generated/dataModel';
type Props = {
	idCourse: Id<'courses'>;
	languageId: Id<'languages'>;
};

const getLevelColor = (level: string) => {
	switch (level?.toLowerCase()) {
		case 'easy':
			return 'bg-green-100 text-green-800 hover:bg-green-100';
		case 'medium':
			return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
		case 'hard':
			return 'bg-red-100 text-red-800 hover:bg-red-100';
		default:
			return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case 'public':
			return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
		case 'private':
			return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
		default:
			return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
	}
};

export default function CourseLessonList({idCourse, languageId}: Props) {
	const {isPending: loadingLessons, data: lessonsData} = useGetLessonsByCourseId(idCourse);
	const {isPending: pendingAdd, mutate: addLesson} = useAddLesson();
	const disabled = loadingLessons || pendingAdd;
	const lessons: LessonType[] = lessonsData?.lessons ?? [];
	const router = useRouter();
	const document = nanoid(60);
	const defaultArgs: AddLessonArgs = {
		courseId: idCourse,
		name: 'New Lesson',
		level: 'easy',
		document,
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

	const handleLessonClick = (lessonId: string) => {
		router.push(`/admin/room/lesson/${lessonId}`);
	};

	const privateLessons = lessons.filter(lesson => lesson.status === 'private').length;
	const totalLessons = lessons.length;

	return (
		<div className="space-y-4">
			{/* Header with Progress */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h3 className="text-xl font-semibold">Lessons</h3>
					<p className="text-sm text-muted-foreground">
						{totalLessons > 0
							? `${privateLessons}/${totalLessons} private`
							: 'No lessons yet'}
					</p>
				</div>
			</div>

			{/* Desktop Table View */}
			<div className="hidden md:block">
				<Table className="overflow-hidden">
					<TableHeader>
						<TableRow>
							<TableHead className="w-16 text-center">Level</TableHead>
							<TableHead>Name</TableHead>
							<TableHead className="w-20">Visibility</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lessons.length === 0 && !loadingLessons && (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-8">
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<BookOpen className="h-8 w-8" />
										<p>No lessons found</p>
										<p className="text-sm">
											Add your first lesson to get started
										</p>
									</div>
								</TableCell>
							</TableRow>
						)}
						{loadingLessons && (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-8">
									<div className="flex items-center justify-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										<span>Loading lessons...</span>
									</div>
								</TableCell>
							</TableRow>
						)}
						{lessons.map(lesson => (
							<TableRow
								key={lesson._id}
								className={cn('cursor-pointer hover:bg-muted/50 transition-colors')}
								onClick={() => handleLessonClick(lesson._id)}>
								<TableCell className="w-16">
									<div className="flex items-center justify-center">
										<LevelIcon level={lesson.level} />
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span className="font-medium truncate">{lesson.name}</span>
									</div>
								</TableCell>
								<TableCell className="w-20">
									<Badge
										variant="secondary"
										className={`text-xs ${getStatusColor(lesson.status)}`}>
										{lesson.status === 'private' ? (
											<EyeOff className="h-3 w-3 mr-1" />
										) : (
											<Eye className="h-3 w-3 mr-1" />
										)}
										{lesson.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow className="hover:bg-transparent">
							<TableCell colSpan={4} className="p-0">
								<Button
									variant="ghost"
									disabled={disabled}
									onClick={handleAdd}
									className={cn(
										'w-full h-12 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-all duration-200',
										disabled && 'opacity-50 cursor-not-allowed',
									)}>
									{pendingAdd ? (
										<div className="flex items-center gap-2">
											<Loader2 className="h-4 w-4 animate-spin" />
											<span>Adding lesson...</span>
										</div>
									) : (
										<div className="flex items-center gap-2 text-blue-600">
											<Plus className="h-4 w-4" />
											<span>Add New Lesson</span>
										</div>
									)}
								</Button>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>

			{/* Mobile Card View */}
			<div className="md:hidden space-y-3">
				{lessons.length === 0 && !loadingLessons && (
					<Card>
						<CardContent className="p-8 text-center">
							<div className="flex flex-col items-center gap-3 text-muted-foreground">
								<BookOpen className="h-12 w-12" />
								<p className="text-lg font-medium">No lessons found</p>
								<p className="text-sm">Add your first lesson to get started</p>
							</div>
						</CardContent>
					</Card>
				)}

				{loadingLessons && (
					<Card>
						<CardContent className="p-8 text-center">
							<div className="flex items-center justify-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" />
								<span>Loading lessons...</span>
							</div>
						</CardContent>
					</Card>
				)}

				{lessons.map(lesson => (
					<Card
						key={lesson._id}
						className="cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.98]"
						onClick={() => handleLessonClick(lesson._id)}>
						<CardContent className="p-4">
							<div className="flex items-start justify-between gap-3">
								<div className="flex items-start gap-3 flex-1 min-w-0">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-2">
											{lesson.status === 'private' && (
												<Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
											)}
											<h4 className="font-semibold text-base leading-tight truncate">
												{lesson.name}
											</h4>
										</div>
										<div className="flex items-center gap-2">
											<Badge
												variant="secondary"
												className={`text-xs ${getLevelColor(lesson.level)}`}>
												{lesson.level}
											</Badge>
											<Badge
												variant="secondary"
												className={`text-xs ${getStatusColor(lesson.status)}`}>
												{lesson.status === 'private' ? (
													<EyeOff className="h-3 w-3 mr-1" />
												) : (
													<Eye className="h-3 w-3 mr-1" />
												)}
												{lesson.status}
											</Badge>
											{'state' in lesson && lesson.state === 'completed' && (
												<Badge
													variant="secondary"
													className="text-xs bg-green-100 text-green-800 hover:bg-green-100">
													<CircleCheckBig className="h-3 w-3 mr-1" />
													Completed
												</Badge>
											)}
										</div>
									</div>
								</div>
								<ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
							</div>
						</CardContent>
					</Card>
				))}

				{/* Mobile Add Button */}
				<Card className="border-dashed border-2 border-blue-200">
					<CardContent className="p-4">
						<Button
							variant="ghost"
							disabled={disabled}
							onClick={handleAdd}
							className="w-full h-12 text-blue-600 hover:bg-blue-50">
							{pendingAdd ? (
								<div className="flex items-center gap-2">
									<Loader2 className="h-4 w-4 animate-spin" />
									<span>Adding lesson...</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<Plus className="h-4 w-4" />
									<span>Add New Lesson</span>
								</div>
							)}
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
