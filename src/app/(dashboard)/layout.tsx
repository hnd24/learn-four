import Header from "@/components/header";
import {UserStoreProvider} from "@/providers/user-store-provider";
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
		<UserStoreProvider>
			<div className="md:px-2 w-full flex flex-col items-center justify-center">
				<Header />

				<div className=" w-full flex flex-col items-center justify-center">{children}</div>
			</div>
		</UserStoreProvider>
	);
}
