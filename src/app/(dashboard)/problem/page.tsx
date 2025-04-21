"use client";

import ContentProblem from "@/feature/problem/content/content-problem";
import {ProblemStoreProvider} from "@/providers/problem-store-provider";

export default function ProblemPage() {
	return (
		<ProblemStoreProvider>
			<div className="w-full px-1 sm:px-4 pt-8">
				<ContentProblem />
			</div>
		</ProblemStoreProvider>
	);
}
