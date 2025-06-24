'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {useGetCourses} from '@/hook/data/course';
import {CourseStateType} from '@/types';
import {Plus} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useStatusFilter} from '../hook/use-filters';
import DialogCourse from './dialog-course';

export default function ListCourseCard() {
	const {getCourses, loading} = useGetCourses();
	const {
		status: {type: status},
	} = useStatusFilter();

	const [rawCourses, setRawCourses] = useState<CourseStateType[]>([]);
	const [courses, setCourses] = useState<CourseStateType[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [idCourse, setIdCourse] = useState<string>('');

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
			<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2  md:max-w-[82rem]  md:grid-cols-3 xl:grid-cols-4">
				{randomArray.map((item: number) => (
					<Skeleton key={item} className="h-44 w-full bg-gray-200 shadow" />
				))}
			</div>
		);
	}
	return (
		<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[82rem] md:grid-cols-3 xl:grid-cols-4">
			{courses.map(courses => (
				<Card
					onClick={() => {
						setIdCourse(courses._id);
						setIsOpen(true);
					}}
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
			{/* add course */}
			<Button
				variant="outline"
				size="icon"
				className="size-full min-h-40 cursor-pointer shadow-leafyGreen bg-darkOceanBlue/20 group
				hover:scale-[1.01] hover:bg-darkOceanBlue/30 hover:shadow-md transition-transform">
				<CardContent>
					<CardDescription>
						<Plus className="size-16 group-hover:scale-110 transition-transform text-leafyGreen " />
					</CardDescription>
				</CardContent>
			</Button>
			{idCourse && (
				<DialogCourse
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
					}}
					idCourse={idCourse}
				/>
			)}
		</div>
	);
}
