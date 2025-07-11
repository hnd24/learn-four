'use client';
import {Hint} from '@/components/hint';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {useGetPublicCourses} from '@/hook/data/course';
import {CourseStateType} from '@/types';
import {useUser} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';

export default function ListCourseCard() {
	const {isSignedIn} = useUser();
	const [courses, setCourses] = useState<CourseStateType[]>([]);
	const {data, isPending, error} = useGetPublicCourses();
	const router = useRouter();
	useEffect(() => {
		setCourses(data || []);
	}, [isPending, data]);

	useEffect(() => {
		if (error) {
			console.error('⚙️ Error fetching courses:', error);
			toast.error('Failed to load courses. Please try reload again.');
		}
	}, [error]);

	if (isPending) {
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
		<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
			{courses.map(courses => (
				<Hint
					key={courses._id}
					label={
						isSignedIn
							? 'Click to view course details'
							: 'Sign in to view course details'
					}>
					<Card
						onClick={() => {
							isSignedIn && router.push(`/course/${courses._id}`);
						}}
						className="relative overflow-hidden cursor-pointer shadow-leafyGreen hover:scale-[1.01] hover:shadow-md transition-transform">
						<CardHeader>
							<div className="flex items-center space-x-2">
								<img
									alt={`icon ${courses.name}`}
									src={courses.logo}
									width={28}
									height={28}
									className="size-7"
								/>

								<CardTitle>{courses.name}</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>{courses.description}</CardDescription>
						</CardContent>
					</Card>
				</Hint>
			))}
		</div>
	);
}

function CardSkeleton() {
	return (
		<Card className="h-40 relative overflow-hidden shadow-leafyGreen ">
			<CardHeader>
				<div className="flex items-center space-x-2">
					<Skeleton className="size-7 rounded-full bg-gray-300" />

					<Skeleton className="h-6 w-20 bg-gray-300" />
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-1">
				<Skeleton className="h-4 w-52 bg-gray-300" />
				<Skeleton className="h-4 w-32 bg-gray-300" />
				<Skeleton className="h-4 w-40 bg-gray-300" />
			</CardContent>
		</Card>
	);
}
