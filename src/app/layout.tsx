import {Toaster} from '@/components/ui/sonner';
import {inter} from '@/lib/font';
import {ConvexClientProvider} from '@/providers/convex-client-provider';
import {ThemeProvider} from '@/providers/theme-provider';
import {ClerkProvider} from '@clerk/nextjs';
import {Provider as JotaiProvider} from 'jotai';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import '../style/globals.css';
import '../styles/prosemirror.css';
import '../styles/text-editor.css';

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
						// enableSystem
						defaultTheme="dark"
						disableTransitionOnChange
						// forcedTheme="dark"
					>
						<ConvexClientProvider>
							<NuqsAdapter>
								<JotaiProvider>
									{children}
									<Toaster richColors />
								</JotaiProvider>
							</NuqsAdapter>
						</ConvexClientProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
