'use client';

import {Hint} from '@/components/hint';
import LoadingState from '@/components/loading-state';
import NotFoundState from '@/components/not-found-state';
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
			<div className="mx-6 md:mx-auto bg-background w-full md:max-w-4xl lg:max-w-6xl p-6">
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
									<Image
										width={28}
										height={28}
										alt={course.authorName}
										src={course.authorImage}
										className="size-7 rounded-full object-cover"
									/>
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
				<section className="flex flex-col gap-6">
					{/* Course Content */}
					<div>
						<h3 className="text-xl font-semibold ">Content</h3>
						<p className="text-muted-foreground">{course.document}</p>
					</div>

					{/* Lessons */}
					<div>
						<h3 className="text-xl  font-semibold mb-2">Lessons</h3>
						<LessonTable idCourse={courseId} />
					</div>
				</section>
			</div>
		</div>
	);
}
