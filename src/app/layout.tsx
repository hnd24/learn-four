import {ConvexClientProvider} from "@/providers/ConvexClientProvider";
import {ClerkProvider} from "@clerk/nextjs";
import {Geist, Geist_Mono} from "next/font/google";
import {NuqsAdapter} from "nuqs/adapters/next/app";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLIC_KEY}>
			<html lang="en" suppressHydrationWarning>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ConvexClientProvider>
						<NuqsAdapter>{children}</NuqsAdapter>
					</ConvexClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
