'use client';

import {Skeleton} from '@/components/ui/skeleton';
import {cn} from '@/lib/utils';
import {ClientSideSuspense, useOthers, useSelf} from '@liveblocks/react/suspense';
import {useMemo} from 'react';
import {Avatar} from './avatar';

export const MAX_AVATARS = 1;

export const Avatars = () => {
	const self = useSelf();
	const others = useOthers();
	const users = useMemo(() => (self ? [self, ...others] : others), [self, others]);

	return (
		<>
			<div className="flex items-center">
				{users.slice(0, MAX_AVATARS).map(({connectionId, info, id}) => (
					<Avatar
						key={connectionId}
						src={info.avatar}
						name={self.id === id ? 'You' : info.name}
						color={info.color}
					/>
				))}
				{users.length > MAX_AVATARS ? (
					<div className="bg-accent border-2 size-8 rounded-full text-xs font-medium -ml-2 relative ">
						<p
							className={cn(
								'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/3 ',
								{'-translate-x-3/4': users.length - MAX_AVATARS > 9},
							)}>
							+{users.length - MAX_AVATARS}
						</p>
					</div>
				) : null}
			</div>
		</>
	);
};

export const AvatarSkeleton = () => {
	return <Skeleton className="size-8 rounded-full" />;
};

export const AvatarStack = () => {
	return (
		<ClientSideSuspense fallback={<AvatarSkeleton />}>
			<Avatars />
		</ClientSideSuspense>
	);
};
