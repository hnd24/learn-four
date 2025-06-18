import { SignIn } from "@clerk/nextjs";

export const SignInForm = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <SignIn />
        </div>
    );
};
