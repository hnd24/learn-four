import {CommandGroup, CommandItem, CommandSeparator} from '@/components/ui/command';
import {AI_SELECTOR_OPTIONS} from '@/constants/text-editor/ai-selector';
import {StepForward} from 'lucide-react';
import {getPrevText, useEditor} from 'novel';

type Props = {
	onSelect: (value: string, option: string) => void;
};

export const AISelectorCommands = ({onSelect}: Props) => {
	const {editor} = useEditor();

	return (
		<>
			<CommandGroup heading="Edit or review selection">
				{AI_SELECTOR_OPTIONS.map(option => (
					<CommandItem
						onSelect={value => {
							if (!editor) {
								return;
							}

							const slice = editor.state.selection.content();
							const text = editor.storage.markdown.serializer.serialize(
								slice.content,
							);
							onSelect(text, value);
						}}
						className="flex gap-2 px-4"
						key={option.value}
						value={option.value}>
						<option.icon className="size-4 text-darkAzureBlue" />
						{option.label}
					</CommandItem>
				))}
			</CommandGroup>
			<CommandSeparator />
			<CommandGroup heading="Use AI to do more">
				<CommandItem
					onSelect={() => {
						if (!editor) {
							return;
						}

						const pos = editor.state.selection.from;

						const text = getPrevText(editor, pos);
						onSelect(text, 'continue');
					}}
					value="continue"
					className="gap-2 px-4">
					<StepForward className="size-4 text-darkAzureBlue" />
					Continue writing
				</CommandItem>
			</CommandGroup>
		</>
	);
};
