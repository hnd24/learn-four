import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s | Learn Four',
		default: 'Problem',
	},
	description: 'Learn Four is a platform for learning and practicing programming concepts.',
};

export default function ProblemLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
