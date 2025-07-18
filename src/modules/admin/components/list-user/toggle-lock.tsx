'use client';

import {Button} from '@/components/ui/button';
import {useLockUser, useUnLockUser} from '@/hook/data/admin';
import {UserStateType} from '@/types';
import {Loader2, Lock, Unlock} from 'lucide-react';
import {toast} from 'sonner';

type Props = {
	user: UserStateType;
};

export default function ToggleLock({user}: Props) {
	const {mutate: lock, isPending: pendLock} = useLockUser();
	const {mutate: unlock, isPending: pendUnLock} = useUnLockUser();
	const pending = pendLock || pendUnLock;
	let newUser = user;
	const handleToggle = () => {
		if (newUser.locked) {
			unlock(
				{userId: user.userId},
				{
					onSuccess: () => {
						toast.success('Successfully unlocked user');
						newUser.locked = false;
					},
					onError: error => {
						toast.error('Failed to unlock user');
						console.error('⚙️ Error unlocking user:', error);
					},
				},
			);
		} else {
			if (user.role !== 'user') {
				toast.error('Only regular users can be locked');
				return;
			}
			lock(
				{userId: user.userId},
				{
					onSuccess: () => {
						toast.success('Successfully locked user');
						newUser.locked = true;
					},
					onError: error => {
						toast.error(`Failed to lock user`);
						console.error('⚙️ Error locking user:', error);
					},
				},
			);
		}
	};
	return (
		<Button
			disabled={pending}
			variant="outline"
			size="sm"
			className="w-full !px-1"
			onClick={handleToggle}>
			{pending ? (
				<div className="flex items-center gap-2">
					<Loader2 className="size-3 animate-spin" />
					Loading
				</div>
			) : newUser.locked ? (
				<div className=" flex items-center gap-2">
					<Unlock className="size-3" />
					Unlock
				</div>
			) : (
				<div className="flex items-center gap-2">
					<Lock className="size-3" />
					Lock
				</div>
			)}
		</Button>
	);
}
