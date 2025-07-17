import Magic from '@/components/icons/magic';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {EditorBubble, removeAIHighlight, useEditor} from 'novel';
import {type ReactNode, useEffect, useState} from 'react';
import {NodeSelector} from '../selector/node-selector';
import {AISelector} from './ai-selector';

interface Props {
	children: ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const GenerativeMenuSwitch = ({children, open, onOpenChange}: Props) => {
	const {editor} = useEditor();
	const [showMore, setShowMore] = useState(true);

	useEffect(() => {
		if (!open && editor) removeAIHighlight(editor);

		if (open && editor) {
			editor.view.dom.classList.add('novel-ai-active');
		}

		return () => {
			editor?.view.dom.classList.remove('novel-ai-active');
		};
	}, [open, editor]);

	return (
		<EditorBubble
			tippyOptions={{
				placement: 'auto',
				interactive: true,

				onShow: () => {
					if (!editor) {
						return;
					}

					const parentNode = editor.state.selection.$from.parent;
					setShowMore(parentNode.type.name !== 'codeBlock');
				},

				onHidden: () => {
					if (!editor) {
						return;
					}

					onOpenChange(false);
					editor.chain().unsetHighlight().run();
				},
			}}
			className="bg-popover border-muted flex w-fit max-w-[90vw] overflow-hidden rounded-md border shadow-xl">
			{open && <AISelector onOpenChange={onOpenChange} />}
			{!open && (
				<>
					<Button
						className="gap-1 rounded-none text-cyan-700"
						variant="ghost"
						onClick={() => onOpenChange(true)}
						size="sm">
						<Magic className="size-5" />
						Ask AI
					</Button>
					<Separator orientation="vertical" />
					<NodeSelector />
					{showMore && children}
				</>
			)}
		</EditorBubble>
	);
};
