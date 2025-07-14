import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s | Learn Four',
		default: 'Lesson Room',
	},
	description: 'Learn Four is a platform for learning and practicing programming concepts.',
};

export default function LessonRoomLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
