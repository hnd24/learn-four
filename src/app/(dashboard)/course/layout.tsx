import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Course",
	description: "Useful programming courses are waiting for you",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
