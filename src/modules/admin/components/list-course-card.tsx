'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {useGetCourses} from '@/hook/data/course';
import {CourseStateType} from '@/types';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useStatusFilter} from '../hook/use-filters';

export default function ListCourseCard() {
	const {getCourses, loading} = useGetCourses();
	const {
		status: {type: status},
	} = useStatusFilter();

	const [rawCourses, setRawCourses] = useState<CourseStateType[]>([]);
	const [courses, setCourses] = useState<CourseStateType[]>([]);

	useEffect(() => {
		const fetchCourses = async () => {
			const data = await getCourses();
			if (data.length > 0) {
				setRawCourses(data);
				setCourses(data); // mặc định hiển thị tất cả
			}
		};
		fetchCourses();
	}, [getCourses]);

	useEffect(() => {
		if (status === 'all') {
			setCourses(rawCourses);
		} else {
			const filtered = rawCourses.filter(course => course.status === status);
			setCourses(filtered);
		}
	}, [status, rawCourses]);
	if (loading) {
		const randomArray = Array.from({length: 6}, (_, i) => i + 1);
		return (
			<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
				{randomArray.map((item: number) => (
					<Skeleton key={item} className="h-44 w-full bg-gray-200 shadow" />
				))}
			</div>
		);
	}
	return (
		<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
			{courses.map(courses => (
				<Card
					key={courses._id}
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
			))}
		</div>
	);
}
