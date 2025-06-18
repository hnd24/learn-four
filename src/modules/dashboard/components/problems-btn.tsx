"use client";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {useUser} from "@clerk/nextjs";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

export default function ProblemBtn() {
	const {isSignedIn} = useUser();
	return (
		<Hint label={isSignedIn ? "Click to view problems" : "Sign in to view problems"}>
			<Link href="/problems">
				<Button size="lg" className="h-11 px-8" disabled={!isSignedIn}>
					Get Started
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</Link>
		</Hint>
	);
}
