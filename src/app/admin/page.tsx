"use client";

import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";

export default function AdminPage() {
	return (
		<div className=" ">
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Hello</Button>
				</SignInButton>
				<SignUpButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
}
