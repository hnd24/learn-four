'use client';

import {ClientSideSuspense} from '@liveblocks/react/suspense';
import {FileText, Loader2} from 'lucide-react';
import TextEditorContent from './text-editor-content';

type Props = {
	isPublished: boolean;
};

export const TextEditorSkeleton = () => {
	return (
		<div className="bg-border flex h-full w-full flex-col overflow-hidden rounded-md border">
			<div className="bg-accent flex h-10 w-full shrink-0 items-center gap-2 rounded-t-md px-4">
				<FileText className="size-4 text-blue-500" />
				Document
			</div>
			<div className="flex flex-1 flex-col items-center justify-center">
				<Loader2 className="text-muted-foreground size-6 animate-spin" />
				<p className="text-muted-foreground mt-2 text-sm">Content loading...</p>
			</div>
		</div>
	);
};

export default function TextEditor({isPublished}: Props) {
	return (
		<ClientSideSuspense fallback={<TextEditorSkeleton />}>
			<TextEditorContent isPublished={isPublished} />
		</ClientSideSuspense>
	);
}
