import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Admin",
	description: "Useful programming courses are waiting for you",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="md:px-2 w-full flex flex-col items-center justify-center">{children}</div>;
}
