'use client';

import 'tldraw/tldraw.css';

import {useSelf} from '@liveblocks/react/suspense';
import {Tldraw} from 'tldraw';

import {useYjsStore} from '@/hook/canvas/use-yjs-store';

type Props = {
	isPublished: boolean;
};

export default function CanvasContent({isPublished}: Props) {
	const {id, info} = useSelf(me => me);

	const store = useYjsStore({
		user: {id, color: info.color, name: info.name},
	});

	if (isPublished) {
		return (
			<div className="h-full w-full flex-1 border">
				<Tldraw autoFocus inferDarkMode />
			</div>
		);
	}

	return (
		<div className="h-full w-full flex-1 border">
			<Tldraw store={store} autoFocus inferDarkMode />
		</div>
	);
}
