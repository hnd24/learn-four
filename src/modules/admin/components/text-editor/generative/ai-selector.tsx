'use client';

import {Command, CommandInput} from '@/components/ui/command';

import CrazySpinner from '@/components/icons/crazy-spinner';
import Magic from '@/components/icons/magic';
import {MemoizedMarkdown} from '@/components/memoized-markdown';
import {Button} from '@/components/ui/button';
import {useCompletion} from '@ai-sdk/react';
import {Bot} from 'lucide-react';
import {addAIHighlight, useEditor} from 'novel';
import {useEffect} from 'react';
import {toast} from 'sonner';
import ResizableScrollArea from '../resizable-scroll-area';
import {AICompletionCommands} from './ai-completion-command';
import {AISelectorCommands} from './ai-selector-commands';

type Props = {
	onOpenChange: (open: boolean) => void;
};

export function AISelector({onOpenChange}: Props) {
	const {editor} = useEditor();

	useEffect(() => {
		if (!editor) {
			return;
		}

		editor.view.dom.classList.add('novel-ai-answer');

		return () => {
			editor.view.dom.classList.remove('novel-ai-answer');
		};
	}, [editor]);

	// IMPORTANT
	// AI completion state
	const {completion, complete, setCompletion, isLoading, input, setInput} = useCompletion({
		experimental_throttle: 50,
		onResponse: response => {
			if (response.status === 429) {
				toast.error('You have reached your request limit for the day.');
				return;
			}
		},
		onError: e => {
			toast.error(e.message);
		},
	});

	const hasCompletion = completion.length > 0;

	const onSubmit = () => {
		if (!editor) {
			return;
		}

		if (completion) {
			if (input.trim().length === 0) {
				return;
			}
			return complete(completion, {
				body: {
					option: 'zap',
					command: input,
				},
			}).then(() => setInput(''));
		}

		const slice = editor.state.selection.content();
		const text = editor.storage.markdown.serializer.serialize(slice.content);

		complete(text, {
			body: {
				option: 'zap',
				command: input,
			},
		}).then(() => setInput(''));
	};

	return (
		<Command className="w-auto">
			{hasCompletion && (
				<ResizableScrollArea height={300} minWidth={350} maxWidth={600}>
					<div className="w-full overflow-hidden p-2 px-4">
						<div className="prose dark:prose-invert prose-sm overflow-wrap-anywhere w-full max-w-none break-words">
							<div className="w-full overflow-hidden p-2 px-4">
								<div className="prose dark:prose-invert prose-sm markdown-wrap w-full max-w-none [&_code]:text-sm [&_pre]:bg-transparent [&_pre]:p-0 [&_pre>div]:!p-4">
									<MemoizedMarkdown id="novel" content={completion} />
								</div>
							</div>
						</div>
					</div>
				</ResizableScrollArea>
			)}

			{isLoading && (
				<div className="flex h-12 w-full items-center px-4 text-sm font-medium text-cyan-700">
					<Magic className="mr-2 h-4 w-4 shrink-0" />
					AI is thinking
					<div className="mt-1 ml-2">
						<CrazySpinner />
					</div>
				</div>
			)}
			{!isLoading && (
				<>
					<form
						className="relative"
						onSubmit={e => {
							e.preventDefault();
							onSubmit();
						}}>
						<CommandInput
							value={input}
							onValueChange={setInput}
							autoFocus
							placeholder={
								hasCompletion
									? 'Tell AI what to do next'
									: 'Ask AI to edit or generate...'
							}
							onFocus={() => {
								if (!editor) {
									return;
								}

								addAIHighlight(editor);
							}}
							onKeyDown={e => {
								if (e.key === 'Enter' && !e.shiftKey) {
									onSubmit();
								}
							}}
							className="pr-8"
						/>
						<Button
							size="icon"
							className="absolute top-1/2 right-2 size-6 -translate-y-1/2 rounded-full bg-cyan-700 hover:bg-cyan-800 dark:hover:bg-cyan-600"
							type="submit">
							<Bot className="size-4" />
						</Button>
					</form>
					{hasCompletion ? (
						<AICompletionCommands
							onDiscard={() => {
								if (!editor) {
									return;
								}

								editor.chain().unsetHighlight().focus().run();
								onOpenChange(false);
								editor.view.dom.classList.remove('novel-ai-active');

								setCompletion('');
							}}
							completion={completion}
						/>
					) : (
						<AISelectorCommands
							onSelect={(value, option) => complete(value, {body: {option}})}
						/>
					)}
				</>
			)}
		</Command>
	);
}
