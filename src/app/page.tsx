import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
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
