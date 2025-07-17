'use client';

import NotAccessState from '@/components/not-access';
import {useCheckAdmin} from '@/hook/data/admin';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {useUser} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';

export default function AdminLayout({
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
	const {data: isAdmin, isPending} = useCheckAdmin();
	if (isPending) {
		return <CostumeLoadingPage />;
	}
	if (!isAdmin) {
		return <NotAccessState className="h-screen w-screen" />;
	}
	return <>{children}</>;
}
