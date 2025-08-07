'use client';

import NotAccessState from '@/components/not-access';
import {useGetRole} from '@/hook/data/user';
import {roleUserAtom} from '@/modules/admin/atom/role-user';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {useSetAtom} from 'jotai';

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const {data: role, isPending: pendingRole} = useGetRole();
	const allowed = role === 'admin' || role === 'super_admin';
	const setRole = useSetAtom(roleUserAtom);

	if (role) {
		setRole(role);
	}
	if (pendingRole) {
		return <CostumeLoadingPage />;
	}
	if (!allowed) {
		return <NotAccessState className="h-screen w-screen" />;
	}
	return <>{children}</>;
}
