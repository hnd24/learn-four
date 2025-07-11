import Header from '@/modules/admin/components/header';
import type {Metadata} from 'next';

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
			{children}
		</div>
	);
}
