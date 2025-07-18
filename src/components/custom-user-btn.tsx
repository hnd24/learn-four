'use client';
import {useGetMe, useUpdateProfile} from '@/hook/data/user';
import {UserStateType} from '@/types';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {Separator} from '@/components/ui/separator';

import {LIST_LINK} from '@/constants';
import {deleteFile} from '@/lib/delete-file';
import {uploadFile} from '@/lib/upload-file';
import {cn} from '@/lib/utils';
import {SignOutButton} from '@clerk/nextjs';
import {isEqual} from 'lodash';
import {FileCheck, Loader2, LogOut, UserPen} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import {Button} from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {Input} from './ui/input';
import {Skeleton} from './ui/skeleton';
import {Textarea} from './ui/textarea';
export default function CustomUserBtn() {
	const {data: user, isPending: loading} = useGetMe();
	const [open, setOpen] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					{loading || !user ? (
						<Skeleton className="size-9 rounded-full" />
					) : (
						<Avatar className="border-2 cursor-pointer size-9">
							<AvatarImage src={user?.image || '/placeholder.svg'} alt={user.name} />
							<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
						</Avatar>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => {
							setOpen(true);
						}}
						className="flex items-center gap-2 ">
						<UserPen className="size-4" />
						View Profile
					</DropdownMenuItem>

					<SignOutButton>
						<DropdownMenuItem className="flex items-center gap-2 text-red-500">
							<LogOut className="size-4 text-red-500" />
							Sign Out
						</DropdownMenuItem>
					</SignOutButton>
				</DropdownMenuContent>
			</DropdownMenu>
			{user && <UserDialog user={user as UserStateType} open={open} setOpen={setOpen} />}
		</>
	);
}

type PropsUserDialog = {
	user: UserStateType;
	open: boolean;
	setOpen: (open: boolean) => void;
};

function UserDialog({user, open, setOpen}: PropsUserDialog) {
	const [loadUpFile, setLoadUpFile] = useState<boolean>(false);
	const {mutate: updateProfile, isPending} = useUpdateProfile();
	const [newUser, setNewUser] = useState<UserStateType>(user);
	const disabled = loadUpFile || isPending;

	const handleUpdate = () => {
		const param = {
			...{name: newUser.name === user.name ? undefined : newUser.name},
			...{image: newUser.image === user.image ? undefined : newUser.image},
			...{
				introduce: newUser.introduce === user.introduce ? undefined : newUser.introduce,
			},
			...{
				links: isEqual(newUser.links, user?.links) ? undefined : newUser.links,
			},
		};
		if (Object.keys(param).length === 0) {
			toast.error('No changes to update');
			return;
		}
		updateProfile(param, {
			onSuccess: () => {
				toast.success('Profile updated successfully');
			},
			onError: error => {
				toast.error(`Failed to update profile: ${error.message}`);
				console.log('⚙️ Error updating profile:', error);
			},
		});
	};

	const handleChange = async (file: File) => {
		setLoadUpFile(true);
		if (!file.type.includes('image/')) {
			toast.error('Please upload a valid image file.');
			return;
		}
		const url = await uploadFile(file);
		setNewUser({
			...newUser,
			image: url,
		});
		if (user?.image?.includes('.vercel-storage.com')) {
			await deleteFile(user.image);
		}

		handleUpdate();
		setLoadUpFile(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<>
							<input
								disabled={disabled}
								type="file"
								id="change-avatar"
								className="hidden"
								onChange={e => {
									const file = e.target.files?.[0];
									if (!file) return;

									handleChange(file as File);
								}}
							/>
							<Avatar
								onClick={() => document.getElementById('change-avatar')?.click()}
								className={cn(
									' cursor-pointer size-10 border-2 hover:grayscale-50 hover:opacity-60',
									disabled && 'grayscale ',
								)}>
								<AvatarImage
									src={user?.image || '/placeholder.svg'}
									alt={user.name}
								/>
								<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
							</Avatar>
						</>
						<Input
							className="max-w-56"
							defaultValue={user.name}
							onChange={e => setNewUser({...newUser, name: e.target.value})}
						/>
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="text-sm font-medium text-muted-foreground">Email:</span>
						<span className="col-span-3 text-sm">{user.email}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="text-sm font-medium text-muted-foreground">Role:</span>
						<span className="col-span-2">
							<Badge
								variant={
									user.role === 'super_admin'
										? 'default'
										: user.role === 'admin'
											? 'secondary'
											: 'outline'
								}>
								{user.role || 'user'}
							</Badge>
						</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="text-sm font-medium text-muted-foreground">Status:</span>
						<span className="col-span-2">
							{user.locked ? (
								<Badge variant="destructive">Locked</Badge>
							) : (
								<Badge>Active</Badge>
							)}
						</span>
					</div>

					<>
						<Separator />
						<div className="w-full flex flex-col items-start gap-4">
							<span className="text-sm font-medium text-muted-foreground">
								Intro:
							</span>
							<Textarea
								defaultValue={user.introduce}
								onChange={e => setNewUser({...newUser, introduce: e.target.value})}
							/>
						</div>
					</>
					<>
						<Separator />
						<div className="w-full flex flex-col items-start gap-4">
							<div className="text-sm font-medium text-muted-foreground">Links:</div>
							<div className="w-full flex flex-col gap-2">
								{Object.entries(LIST_LINK).map(([key, {icon: Icon, label}]) => {
									const lang = (key as keyof typeof user.links) ?? '';
									return (
										<div key={key} className="w-full flex items-center gap-2 ">
											<Icon className="size-4" />
											<Input
												defaultValue={user.links?.[lang] ?? ''}
												onChange={e => {
													setNewUser({
														...newUser,
														links: {
															...user.links,
															[lang]: e.target.value,
														},
													});
												}}
												className="w-full"
											/>
										</div>
									);
								})}
							</div>
						</div>
					</>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<Button
						onClick={handleUpdate}
						disabled={disabled}
						className="flex items-center gap-2">
						{isPending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<FileCheck className="size-4" />
						)}
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
