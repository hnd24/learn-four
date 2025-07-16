import ListCourseCard from '@/modules/admin/components/list-course-card';
import SelectTypeCourse from '@/modules/admin/components/select-type-course';
import {Suspense} from 'react';

export default function AdminPage() {
	return (
		<main className="flex flex-col w-screen min-h-[calc(100vh-64px)]">
			<Suspense fallback={null}>
				<aside className="bg-background fixed inset-y-0 top-16 left-0 hidden w-64 border-r lg:flex">
					<div className="size-full p-2 pt-2  dark:bg-[#121215]">
						<SelectTypeCourse />
					</div>
				</aside>
			</Suspense>
			<div className=" lg:ml-64 flex items-center flex-col p-4 md:p-10">
				<section className="size-full">
					<ListCourseCard />
				</section>
			</div>
		</main>
	);
}
