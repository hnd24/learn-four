import {LiveMap, LiveObject} from '@liveblocks/client';

export type Note = LiveObject<{
	x: number;
	y: number;
	text: string;
	selectedBy: Liveblocks['UserMeta']['info'] | null;
	id: string;
}>;

export type Notes = LiveMap<string, Note>;

declare global {
	interface Liveblocks {
		Presence: {
			cursor: {x: number; y: number} | null; // Whiteboard
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			presence: any; // Canvas
		};

		Storage: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			records: LiveMap<string, any>; // Canvas
		};

		UserMeta: {
			id: string;
			info: {
				name: string;
				avatar: string;
				color: string;
			};
		};

		// Custom events, for useBroadcastEvent, useEventListener
		RoomEvent: {};
		// Example has two events, using a union
		// | { type: "PLAY" }
		// | { type: "REACTION"; emoji: "🔥" };

		// Custom metadata set on threads, for useThreads, useCreateThread, etc.
		ThreadMetadata: {
			// Example, attaching coordinates to a thread
			// x: number;
			// y: number;
		};

		// Custom room info set with resolveRoomsInfo, for useRoomInfo
		RoomInfo: {
			// Example, rooms with a title and url
			// title: string;
			// url: string;
		};
	}
}

export {};
