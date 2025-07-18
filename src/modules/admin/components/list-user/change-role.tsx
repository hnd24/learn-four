'use client';
'use client';

import {Button} from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {useChangeRole} from '@/hook/data/admin';
import {ROLE_USER, UserStateType} from '@/types';
import {Loader2} from 'lucide-react';
import {toast} from 'sonner';

type Props = {
	user: UserStateType;
};

export default function ChangeRole({user}: Props) {
	let newUser = user;
	const {mutate: change, isPending} = useChangeRole();

	if (isPending) {
		return (
			<Button
				size="icon"
				variant="outline"
				disabled
				className="w-full gap-2 flex items-center px-2">
				<Loader2 className="size-4 animate-spin" />
				Loading
			</Button>
		);
	}

	return (
		<Select
			value={newUser.role}
			onValueChange={value => {
				if (value === newUser.role) return;
				change(
					{userId: user.userId, role: value as ROLE_USER},
					{
						onSuccess: () => {
							toast.success(`Successfully changed role`);
							newUser.role = value as ROLE_USER;
						},
						onError: error => {
							console.log('⚙️ Error changing role:', error);
							toast.error(`${error.message || 'Failed to change role'}`);
							return;
						},
					},
				);
			}}>
			<SelectTrigger>
				<SelectValue placeholder="Level" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={'admin'}>Admin</SelectItem>
				<SelectItem value={'user'}>User</SelectItem>
				<SelectItem value={'super_admin'}>Super Admin</SelectItem>
			</SelectContent>
		</Select>
	);
}
