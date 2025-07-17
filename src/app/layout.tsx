import {Toaster} from '@/components/ui/sonner';
import {inter} from '@/lib/font';
import {ConvexClientProvider} from '@/providers/convex-client-provider';
import {ThemeProvider} from '@/providers/theme-provider';
import {ClerkProvider} from '@clerk/nextjs';
import '@liveblocks/react-tiptap/styles.css';
import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-ui/styles/dark/attributes.css';
import {Provider as JotaiProvider} from 'jotai';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import '../style/globals.css';
import '../style/prosemirror.css';
import '../style/text-editor.css';

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
						defaultTheme="light"
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
