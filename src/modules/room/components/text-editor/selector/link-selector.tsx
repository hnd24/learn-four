import {Button} from '@/components/ui/button';
import {PopoverContent} from '@/components/ui/popover';
import {getUrlFromString} from '@/lib/text-editor/utils';
import {Popover, PopoverTrigger} from '@radix-ui/react-popover';
import {Check, Link2, Trash} from 'lucide-react';
import {useEditor} from 'novel';
import {useEffect, useRef, useState} from 'react';

export const LinkSelector = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {editor} = useEditor();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		inputRef.current?.focus();
	});
	if (!editor) return null;

	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button size="sm" variant="ghost" className="gap-2 rounded-none border-none">
					<Link2 className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-60 p-0 " sideOffset={10}>
				<form
					onSubmit={e => {
						const target = e.currentTarget as HTMLFormElement;
						e.preventDefault();
						const input = target[0] as HTMLInputElement;
						const url = getUrlFromString(input.value);
						if (url) {
							editor.chain().focus().setLink({href: url}).run();
							setOpen(false);
						}
					}}
					className="flex p-2 items-center">
					<input
						ref={inputRef}
						type="text"
						placeholder="Paste a link"
						className="bg-background flex-1 pr-2 text-sm outline-none"
						defaultValue={editor.getAttributes('link').href || ''}
					/>
					{editor.getAttributes('link').href ? (
						<Button
							size="icon"
							className="flex size-6 items-center bg-red-600 transition-all hover:bg-red-700 dark:hover:bg-red-500"
							onClick={() => {
								editor.chain().focus().unsetLink().run();
								if (inputRef.current) {
									inputRef.current.value = '';
								}
								setOpen(false);
							}}>
							<Trash className="size-4 text-white" />
						</Button>
					) : (
						<Button
							size="icon"
							className="size-6 bg-emerald-700 transition-all hover:bg-emerald-800 dark:hover:bg-emerald-600">
							<Check className="size-4 text-white" />
						</Button>
					)}
				</form>
			</PopoverContent>
		</Popover>
	);
};
