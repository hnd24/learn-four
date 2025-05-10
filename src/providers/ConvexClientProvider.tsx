"use client";
import CostumeLoadingPage from "@/page/costume-loading-page";
import {ClerkLoaded, ClerkLoading, useAuth} from "@clerk/nextjs";
import {ConvexQueryClient} from "@convex-dev/react-query";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ReactNode} from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
});
convexQueryClient.connect(queryClient);

export function ConvexClientProvider({children}: {children: ReactNode}) {
	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			<QueryClientProvider client={queryClient}>
				<ClerkLoading>
					<CostumeLoadingPage />
				</ClerkLoading>
				<ClerkLoaded>{children}</ClerkLoaded>
			</QueryClientProvider>
		</ConvexProviderWithClerk>
	);
}
