'use client';

import type React from 'react';

import {ScrollArea} from '@/components/ui/scroll-area';
import {useCallback, useEffect, useRef, useState} from 'react';

type Props = {
	children: React.ReactNode;
	height?: number;
	minWidth?: number;
	maxWidth?: number;
	autoScrollToBottom?: boolean;
};

export default function ResizableScrollArea({
	children,
	height = 400,
	minWidth = 200,
	maxWidth = 800,
	autoScrollToBottom = true,
}: Props) {
	const [width, setWidth] = useState(minWidth);
	const containerRef = useRef<HTMLDivElement>(null);
	const isResizing = useRef(false);
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (autoScrollToBottom && scrollAreaRef.current) {
			const scrollContainer = scrollAreaRef.current.querySelector(
				'[data-radix-scroll-area-viewport]',
			);
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		}
	}, [children, autoScrollToBottom]);

	const startResize = useCallback(
		(e: React.MouseEvent) => {
			isResizing.current = true;
			e.preventDefault();

			const startX = e.clientX;
			const startWidth = width;

			const handleMouseMove = (e: MouseEvent) => {
				if (!isResizing.current) return;

				const deltaX = e.clientX - startX;
				const newWidth = Math.max(minWidth, Math.min(startWidth + deltaX, maxWidth));
				setWidth(newWidth);
			};

			const handleMouseUp = () => {
				isResizing.current = false;
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
				document.body.style.cursor = '';
				document.body.style.userSelect = '';
			};

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			document.body.style.cursor = 'ew-resize';
			document.body.style.userSelect = 'none';
		},
		[width, minWidth, maxWidth],
	);

	return (
		<div
			ref={containerRef}
			className="border-border group relative border-b"
			style={{width: `${width}px`, height: `${height}px`}}>
			<ScrollArea ref={scrollAreaRef} className="h-full w-full">
				{children}
			</ScrollArea>

			<div
				className="hover:bg-primary/20 absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-transparent opacity-0 transition-colors group-hover:opacity-100"
				onMouseDown={startResize}
				title="Drag to resize width"
			/>
		</div>
	);
}
