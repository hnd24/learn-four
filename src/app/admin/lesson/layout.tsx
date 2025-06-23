import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Learn Four is a platform for learning and practicing programming concepts.',
};

export default function LessonLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
