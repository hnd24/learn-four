import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {CourseStateType} from '@/types';

type Props = {
	course: CourseStateType;
};

export default function CourseCard({course}: Props) {
	return (
		<Card
			key={course._id}
			className="h-full relative overflow-hidden cursor-pointer shadow-leafyGreen hover:scale-[1.01] hover:shadow-md transition-transform">
			<CardHeader>
				<div className="flex items-center space-x-2">
					{course.logo ? (
						<img
							alt={`icon ${course.name}`}
							src={course.logo}
							width={28}
							height={28}
							className="size-7"
						/>
					) : (
						<div className="size-7 rounded-full bg-muted" />
					)}

					<CardTitle>{course.name || 'New Course'} </CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription>{course.description || 'Description !!!'}</CardDescription>
			</CardContent>
		</Card>
	);
}
