'use client';

import {Button} from '@/components/ui/button';
import {useCheckAdmin} from '@/hook/data/user';
import {useUser} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function AdminBtn() {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const router = useRouter();
	const {isSignedIn, user} = useUser();
	const {isPending, data: result} = useCheckAdmin();
	useEffect(() => {
		setIsAdmin(result || false);
	}, [result, isPending, isSignedIn, user?.id]);
	return (
		<>
			{isAdmin && (
				<Button
					className="flex items-center gap-2 px-4 py-1
					transition-all duration-100 hover:scale-[1.02] "
					onClick={() => router.push('/admin')}>
					<span>
						Admin <span className="hidden md:inline">Mode</span>
					</span>
				</Button>
			)}
		</>
	);
}
