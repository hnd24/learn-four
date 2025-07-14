'use client';

import {LevelIcon} from '@/components/level-icon';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useGetUserLessonInCourse} from '@/hook/data/lesson';
import {cn} from '@/lib/utils';
import {LessonType} from '@/types';
import {BookOpen, ChevronRight, CircleCheckBig, Loader2, Lock, Trophy} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Id} from '../../../../convex/_generated/dataModel';

type Props = {
	idCourse: Id<'courses'>;
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

export default function LessonTable({idCourse}: Props) {
	const {isPending: loadingLessons, data: lessonsData} = useGetUserLessonInCourse(idCourse);
	const lessons: LessonType[] = lessonsData?.lessons ?? [];
	const router = useRouter();
	const handleLessonClick = (lessonId: string) => {
		router.push(`/room/lesson/${lessonId}`);
	};

	const completedLessons = lessons.filter(
		lesson => 'state' in lesson && lesson.state === 'completed',
	).length;
	const totalLessons = lessons.length;
	return (
		<div className="space-y-4">
			{' '}
			{/* Header with Progress */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h3 className="text-xl font-semibold">Lessons</h3>
					<p className="text-sm text-muted-foreground">
						{totalLessons > 0
							? `${completedLessons}/${totalLessons} completed`
							: 'No lessons yet'}
					</p>
				</div>
				{totalLessons > 0 && (
					<div className="flex items-center gap-2">
						<Trophy className="h-4 w-4 text-yellow-500" />
						<div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
							<div
								className="h-full bg-green-500 transition-all duration-300"
								style={{
									width: `${totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}%`,
								}}
							/>
						</div>
						<span className="text-sm font-medium">
							{totalLessons > 0
								? Math.round((completedLessons / totalLessons) * 100)
								: 0}
							%
						</span>
					</div>
				)}
			</div>
			{/* Desktop Table View */}
			<div className="hidden md:block">
				<Table className="overflow-hidden">
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">Status</TableHead>
							<TableHead className="w-16 text-center">Level</TableHead>
							<TableHead>Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lessons.length === 0 && !loadingLessons && (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-8">
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<BookOpen className="h-8 w-8" />
										<p>No lessons found</p>
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
								<TableCell className="w-12">
									{'state' in lesson && lesson.state === 'completed' && (
										<CircleCheckBig className="h-5 w-5 text-green-500" />
									)}
								</TableCell>
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
							</TableRow>
						))}
					</TableBody>
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
			</div>
		</div>
	);
}
