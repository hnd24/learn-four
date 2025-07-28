'use client';

import {Hint} from '@/components/hint';
import LoadingState from '@/components/loading-state';
import NotFoundState from '@/components/not-found-state';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useGetDetailCourse} from '@/hook/data/course';
import {PersonStanding} from 'lucide-react';
import Image from 'next/image';
import {Id} from '../../../../convex/_generated/dataModel';
import LessonTable from './lesson-table';

type Props = {
	courseId: Id<'courses'>;
};

export default function CourseContent({courseId}: Props) {
	const {isPending: loadingCourse, data: course, error} = useGetDetailCourse(courseId);

	if (loadingCourse) {
		return <LoadingState />;
	}
	if (error) {
		return <NotFoundState label="Not Found Course" />;
	}
	return (
		<div className="min-h-[calc(100vh-60px)] w-screen flex justify-between">
			<div className=" md:mx-auto bg-background w-full md:max-w-4xl lg:max-w-6xl p-6">
				<header className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
					<section className="relative flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<div className="flex items-end space-x-2">
								<img
									alt={`icon ${course.language}`}
									src={course.logo}
									width={28}
									height={28}
									className="size-7"
								/>
								<div>
									<h2 className="text-2xl leading-6 font-bold">{course.name}</h2>
								</div>
							</div>
							<p className="size-full text-sm text-muted-foreground min-h-16 truncate-3line">
								{course.description}
							</p>
						</div>
						<div className=" flex gap-2 items-center">
							{/* Author */}
							<div className="flex items-center gap-2">
								<Hint label={`Author: ${course.authorName}`}>
									<Avatar>
										<AvatarImage
											className="object-cover"
											src={course.authorImage}
											alt={course.authorName}
										/>
										<AvatarFallback>
											{course.authorName?.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Hint>
							</div>
							{/* number of learners who joined the course */}
							<div className="border rounded-lg w-fit p-2 pr-3 py-1 flex items-end gap-2 text-sm text-muted-foreground">
								<PersonStanding /> <p>{course.learner} learners</p>
							</div>
						</div>
					</section>
					<Image
						alt="course banner"
						src={course.banner}
						width={256}
						height={200}
						className="rounded-md object-cover w-64 h-40 ml-auto hidden sm:flex"
					/>
				</header>
				<section className="flex flex-col gap-6 w-full">
					{/* Course Content */}
					<div className="size-full flex flex-col gap-2">
						<h3 className="text-xl font-semibold ">Document</h3>
						<pre className="w-full h-auto text-base overflow-x-auto whitespace-pre-wrap">
							{course.document || 'No document available for this course.'}
						</pre>
					</div>

					<LessonTable idCourse={courseId} />
				</section>
			</div>
		</div>
	);
}
