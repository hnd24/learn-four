import {CommandGroup, CommandItem, CommandSeparator} from '@/components/ui/command';
import {Check, TextQuote, TrashIcon} from 'lucide-react';
import {useEditor} from 'novel';

type Props = {
	completion: string;
	onDiscard: () => void;
};

export const AICompletionCommands = ({completion, onDiscard}: Props) => {
	const {editor} = useEditor();
	return (
		<>
			<CommandGroup>
				<CommandItem
					className="gap-2 px-4"
					value="replace"
					onSelect={() => {
						if (!editor) {
							return;
						}

						const selection = editor.view.state.selection;
						editor
							.chain()
							.focus()
							.insertContentAt(
								{
									from: selection.from,
									to: selection.to,
								},
								completion,
							)
							.run();

						onDiscard();
					}}>
					<Check className=" size-4 text-darkAzureBlue" />
					Replace selection
				</CommandItem>
				<CommandItem
					className="gap-2 px-4"
					value="insert"
					onSelect={() => {
						if (!editor) {
							return;
						}

						const selection = editor.view.state.selection;
						editor.chain().focus().insertContentAt(selection.to, completion).run();

						onDiscard();
					}}>
					<TextQuote className="size-4 text-darkAzureBlue" />
					Insert below
				</CommandItem>
			</CommandGroup>
			<CommandSeparator />

			<CommandGroup>
				<CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
					<TrashIcon className="size-4 text-darkAzureBlue" />
					Discard
				</CommandItem>
			</CommandGroup>
		</>
	);
};
