import {Check, ChevronDown} from 'lucide-react';
import {EditorBubbleItem, useEditor} from 'novel';

import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useState} from 'react';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {HIGHLIGHT_COLORS, TEXT_COLORS} from '@/constants/text-editor/color-selector';
import {cn} from '@/lib/utils';

export const ColorSelector = () => {
	const [open, setOpen] = useState(false);
	const {editor} = useEditor();

	if (!editor) return null;
	const activeColorItem = TEXT_COLORS.find(({color}) => editor.isActive('textStyle', {color}));

	const activeHighlightItem = HIGHLIGHT_COLORS.find(({color}) =>
		editor.isActive('highlight', {color}),
	);

	return (
		<Popover modal open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button size="sm" className="gap-2 rounded-none" variant="ghost">
					<span
						className="rounded-sm px-1"
						style={{
							color: activeColorItem?.color,
							backgroundColor: activeHighlightItem?.color,
						}}>
						A
					</span>
					<ChevronDown className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				sideOffset={5}
				className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl"
				align="start">
				<Command>
					<CommandInput placeholder="Search color..." />
					<CommandList>
						<CommandEmpty>No color found.</CommandEmpty>
						<CommandGroup heading="Text Color">
							{TEXT_COLORS.map(({color, name}) => (
								<CommandItem key={color} value={name} asChild>
									<EditorBubbleItem
										key={name}
										onSelect={() => {
											editor.commands.unsetColor();

											if (name !== 'Default') {
												editor
													.chain()
													.focus()
													.setColor(color || '')
													.run();
											}
											setOpen(false);
										}}
										className="hover:bg-accent flex cursor-pointer items-center justify-between px-2 py-1 text-sm">
										<div className="flex items-center gap-2">
											<div
												className={cn(
													'rounded-sm border px-2 py-px font-medium',
													name === 'Default' && 'dark:text-white!',
												)}
												style={{color}}>
												A
											</div>
											<span>{name}</span>
										</div>
									</EditorBubbleItem>
								</CommandItem>
							))}
						</CommandGroup>

						<CommandGroup heading="Highlight Color">
							{HIGHLIGHT_COLORS.map(({name, color}) => (
								<CommandItem key={name} value={`${name}-highlight`} asChild>
									<EditorBubbleItem
										key={name}
										onSelect={() => {
											editor.commands.unsetHighlight();

											if (name !== 'Default') {
												editor.chain().focus().setHighlight({color}).run();
											}
											setOpen(false);
										}}
										className="hover:bg-accent flex cursor-pointer items-center justify-between px-2 py-1 text-sm">
										<div className="flex items-center gap-2">
											<div
												className="rounded-sm border px-2 py-px font-medium"
												style={{
													backgroundColor: color,
												}}>
												A
											</div>
											<span>{name}</span>
										</div>
										{editor.isActive('highlight', {
											color,
										}) && <Check className="h-4 w-4" />}
									</EditorBubbleItem>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
