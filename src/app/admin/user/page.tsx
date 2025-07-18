'use client';
import NotAccessState from '@/components/not-access';
import {useCheckSuperAdmin} from '@/hook/data/admin';
import Header from '@/modules/admin/components/header';
import ListUser from '@/modules/admin/components/list-user';
import CostumeLoadingPage from '@/page/costume-loading-page';
import {useUser} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';

export default function UserPage() {
	const {user, isSignedIn} = useUser();
	const router = useRouter();
	if (isSignedIn && !user) {
		router.replace('/not-found');
		return null;
	}
	const {data: isAdmin, isPending} = useCheckSuperAdmin();
	if (isPending) {
		return <CostumeLoadingPage />;
	}
	if (!isAdmin) {
		return <NotAccessState className="h-screen w-screen" link="/admin" />;
	}

	//TODO: search name, search theo name của user, và có thiết lập debounce, và cập nhật thay đôi vào setName
	// TODO: user table
	return (
		<div className="w-screen min-h-screen flex flex-col ">
			<Header />
			<main className="pt-12 px-3 py-6">
				<section className="size-full  max-w-4xl mx-auto flex flex-col">
					<div className="w-full bg-white  flex flex-col items-center gap-4">
						<span className="text-3xl font-bold text-primary"> User Management</span>
						<ListUser />
					</div>
				</section>
			</main>
		</div>
	);
}
