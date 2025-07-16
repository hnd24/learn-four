'use client';

import {LiveMap} from '@liveblocks/client';
import {LiveblocksProvider, RoomProvider} from '@liveblocks/react';
import {ReactNode} from 'react';
type Props = {
	children: ReactNode;
	problemId?: string;
	lessonId?: string;
};

export function Provider({children, problemId, lessonId}: Props) {
	const params = {
		...(problemId && {problemId}),
		...(lessonId && {lessonId}),
	};
	const roomId = (problemId || lessonId || 'default-room') as string;
	return (
		<LiveblocksProvider
			authEndpoint={async () => {
				const response = await fetch('/api/liveblocks-auth', {
					method: 'POST',
					body: JSON.stringify(params),
				});

				return await response.json();
			}}
			throttle={16}>
			<RoomProvider
				id={roomId}
				initialPresence={{cursor: null, presence: null}}
				initialStorage={{records: new LiveMap()}}>
				{children}
			</RoomProvider>
		</LiveblocksProvider>
	);
}
