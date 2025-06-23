import SelectTypeCourse from '@/modules/admin/components/select-type-course';
import {Suspense} from 'react';

export default function AdminPage() {
	return (
		// This page is for the course management section of the admin panel.
		<main className="flex flex-col w-screen min-h-[calc(100vh-64px)] bg-secondary">
			{/* sidebar */}
			<Suspense fallback={null}>
				<aside className="bg-background fixed inset-y-0 top-16 left-0 hidden w-64 border-r lg:flex">
					<div className="size-full p-2 pt-2  dark:bg-[#121215]">
						<SelectTypeCourse />
					</div>
				</aside>
			</Suspense>

			<section className=" md:ml-64  flex flex-col  ">
				<span>Course</span>
			</section>
		</main>
	);
}
