'use client';

import {LinkType, UserStateType} from '@/types';
import {Facebook, Github, Linkedin, LinkIcon, Phone, Youtube} from 'lucide-react';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {Separator} from '@/components/ui/separator';
import {DEFAULT_LOGO_URL} from '@/constants';
import {useState} from 'react';
import {Button} from '../ui/button';

type Props = {
	user: UserStateType;
};

const getLinkIcon = (key: keyof LinkType) => {
	switch (key) {
		case 'Facebook':
			return <Facebook className="h-4 w-4" />;
		case 'LinkedIn':
			return <Linkedin className="h-4 w-4" />;
		case 'GitHub':
			return <Github className="h-4 w-4" />;
		case 'Youtube':
			return <Youtube className="h-4 w-4" />;
		case 'Phone':
			return <Phone className="h-4 w-4" />;
		default:
			return <LinkIcon className="h-4 w-4" />;
	}
};

export default function UserDialog({user}: Props) {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Avatar
					className="size-9 hover:opacity-60 cursor-pointer"
					onClick={() => setOpen(true)}>
					<AvatarImage
						className="object-cover"
						src={`${user.image || DEFAULT_LOGO_URL}`}
					/>
					<AvatarFallback>{user.name.charAt(0).toUpperCase() || 'H'}</AvatarFallback>
				</Avatar>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Avatar className="h-10 w-10">
							<AvatarImage
								className="object-cover"
								src={user.image || '/placeholder.svg'}
								alt={user.name}
							/>
							<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
						</Avatar>
						{user.name}
					</DialogTitle>
					<DialogDescription>
						Detailed profile information for {user.name}.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{/* <div className="grid grid-cols-4 items-center gap-4">
						<span className="text-sm font-medium text-muted-foreground">Email:</span>
						<span className="col-span-3 text-sm">{user.email}</span>
					</div> */}

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
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="text-sm font-medium text-muted-foreground">Role:</span>
						<span className="col-span-2">
							<Badge>{user.role || 'User'}</Badge>
						</span>
					</div>
					{user.introduce && (
						<>
							<Separator />
							<div className="grid grid-cols-4 items-start gap-4">
								<span className="text-sm font-medium text-muted-foreground">
									Intro:
								</span>
								<p className="col-span-3 text-sm leading-relaxed">
									{user.introduce}
								</p>
							</div>
						</>
					)}

					{user.links && Object.keys(user.links).length > 0 && (
						<>
							<Separator />
							<div className="grid grid-cols-4 items-start gap-4">
								<span className="text-sm font-medium text-muted-foreground">
									Links:
								</span>
								<div className="col-span-3 flex flex-col gap-2">
									{Object.entries(user.links).map(([key, value]) =>
										value ? (
											<a
												key={key}
												href={value}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 text-sm  hover:underline">
												{getLinkIcon(key as keyof LinkType)}
												{key}: {value}
											</a>
										) : null,
									)}
								</div>
							</div>
						</>
					)}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
