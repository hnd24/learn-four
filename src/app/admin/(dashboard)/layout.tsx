import Header from '@/modules/admin/components/header';
import SelectTypeCourse from '@/modules/admin/components/select-type-course';
import type {Metadata} from 'next';
import {Suspense} from 'react';

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Learn Four is a platform for learning and practicing programming concepts.',
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex  min-h-screen flex-col ">
			<Header />
			<main className="flex flex-col w-screen min-h-[calc(100vh-64px)]">
				<Suspense fallback={null}>
					<aside className="bg-background fixed inset-y-0 top-16 left-0 hidden w-64 border-r lg:flex">
						<div className="size-full p-2 pt-2  dark:bg-[#121215]">
							<SelectTypeCourse />
						</div>
					</aside>
					{children}
				</Suspense>
			</main>
		</div>
	);
}
