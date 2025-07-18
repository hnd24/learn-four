'use client';

import NotAccessState from '@/components/not-access';
import {useCheckLocked} from '@/hook/data/user';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {useUser} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const {user, isSignedIn} = useUser();
	const router = useRouter();
	if (isSignedIn && !user) {
		router.replace('/not-found');
		return null;
	}
	const {data: isLocked, isPending} = useCheckLocked();
	if (isPending) {
		return <CostumeLoadingPage />;
	}
	if (isLocked) {
		return <NotAccessState className="h-screen w-screen" />;
	}
	return <>{children}</>;
}
