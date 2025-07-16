import Header from '@/modules/dashboard/components/header';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: {
		template: '%Course | Learn Four',
		default: 'Course',
	},
	description: 'Learn Four is a platform for learning and practicing programming concepts.',
};

export default function CourseLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen w-screen flex-col overflow-hidden">
			<Header />
			<main className="bg-muted flex size-full">
				<div className="mx-auto size-full">{children}</div>
			</main>
		</div>
	);
}
