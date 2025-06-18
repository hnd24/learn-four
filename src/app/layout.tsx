import {inter} from "@/lib/font";
import {ConvexClientProvider} from "@/providers/convex-client-provider";
import {ThemeProvider} from "@/providers/theme-provider";
import {ClerkProvider} from "@clerk/nextjs";
import {NuqsAdapter} from "nuqs/adapters/next/app";
import {Toaster} from "sonner";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLIC_KEY}>
			<html lang="en" suppressHydrationWarning>
				<body className={`${inter.className} antialiased`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
						forcedTheme="light">
						<ConvexClientProvider>
							<NuqsAdapter>{children}</NuqsAdapter>
						</ConvexClientProvider>
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
