import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {NODE_SELECTOR_ITEMS} from '@/constants/text-editor/node-selector';
import {Check, ChevronDown} from 'lucide-react';
import {EditorBubbleItem, useEditor} from 'novel';
import {useState} from 'react';

export const NodeSelector = () => {
	const [open, setOpen] = useState(false);

	const {editor} = useEditor();
	if (!editor) return null;
	const activeItem = NODE_SELECTOR_ITEMS.filter(item => item.isActive(editor)).pop() ?? {
		name: 'Multiple',
	};

	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				asChild
				className="hover:bg-accent gap-2 rounded-none border-none focus:ring-0">
				<Button size="sm" variant="ghost" className="gap-2">
					<span className="text-sm whitespace-nowrap">{activeItem.name}</span>
					<ChevronDown className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent sideOffset={5} align="start" className="w-48 p-1">
				{NODE_SELECTOR_ITEMS.map(item => (
					<EditorBubbleItem
						key={item.name}
						onSelect={editor => {
							item.command(editor);
							setOpen(false);
						}}
						className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm">
						<div className="flex items-center space-x-2">
							<div className="rounded-sm border p-1">
								<item.icon className="size-3" />
							</div>
							<span>{item.name}</span>
						</div>
						{activeItem.name === item.name && <Check className="h-4 w-4" />}
					</EditorBubbleItem>
				))}
			</PopoverContent>
		</Popover>
	);
};
