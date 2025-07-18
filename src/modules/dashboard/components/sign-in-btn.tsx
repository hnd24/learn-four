import CustomUserBtn from '@/components/custom-user-btn';
import {Button} from '@/components/ui/button';
import {SignInButton, SignedIn, SignedOut} from '@clerk/nextjs';

export const SignInBtn = () => {
	return (
		<>
			<SignedOut>
				<SignInButton mode="modal">
					<Button variant="ghost">Sign In</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				{/* <UserButton /> */}
				<CustomUserBtn />
			</SignedIn>
		</>
	);
};
