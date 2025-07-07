'use client';
import {Hint} from '@/components/hint';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useGetCourses} from '@/hook/data/course';
import {CourseStateType} from '@/types';
import {useUser} from '@clerk/nextjs';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function ListCourseCard() {
	const {isSignedIn} = useUser();
	const [courses, setCourses] = useState<CourseStateType[]>([]);
	const {data, isPending} = useGetCourses();
	const router = useRouter();
	useEffect(() => {
		if (data && data.length > 0) {
			setCourses(data);
		}
	}, [isPending, data]);
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
								<Image
									alt={`icon ${courses.language}`}
									src={courses.logo}
									width={28}
									height={28}
									className="size-7"
								/>

								<CardTitle>{courses.language} Course</CardTitle>
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
