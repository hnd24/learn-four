'use client';

import {ClientSideSuspense} from '@liveblocks/react';
import {Loader2} from 'lucide-react';
import CanvasContent from './canvas-content';

export const CanvasSkeleton = () => {
	return (
		<div className="bg-popover flex size-full items-center justify-center rounded-b-md border border-t-0">
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="text-muted-foreground size-6 animate-spin" />
				<p className="text-muted-foreground text-sm">Canvas loading...</p>
			</div>
		</div>
	);
};

type Props = {
	isPublished: boolean;
};

export default function Canvas({isPublished}: Props) {
	return (
		<ClientSideSuspense fallback={<CanvasSkeleton />}>
			<CanvasContent isPublished={isPublished} />
		</ClientSideSuspense>
	);
}
