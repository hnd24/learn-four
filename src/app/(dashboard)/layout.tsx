import Header from "@/components/header";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Learn Four",
		default: "Learn Four",
	},
	description: "Useful programming courses are waiting for you",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="md:px-2 w-full flex flex-col items-center justify-center">
			<Header />
			<div className="w-full flex flex-col items-center justify-center ">{children}</div>
		</div>
	);
}
