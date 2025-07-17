import {
	AIHighlight,
	CharacterCount,
	CodeBlockLowlight,
	Color,
	CustomKeymap,
	GlobalDragHandle,
	HighlightExtension,
	HorizontalRule,
	Mathematics,
	Placeholder,
	StarterKit,
	TaskItem,
	TaskList,
	TextStyle,
	TiptapImage,
	TiptapLink,
	TiptapUnderline,
	Twitter,
	UpdatedImage,
	UploadImagesPlugin,
	Youtube,
} from 'novel';

import {cx} from 'class-variance-authority';
import {Markdown as MarkdownExtension} from 'tiptap-markdown';
import {lowlight} from './lowlight';

//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
	HTMLAttributes: {
		class: cx(
			'text-muted-foreground hover:text-primary cursor-pointer underline underline-offset-[3px] transition-colors',
		),
	},
});

const tiptapImage = TiptapImage.extend({
	addProseMirrorPlugins() {
		return [
			UploadImagesPlugin({
				imageClass: cx('rounded-lg border border-stone-200 opacity-40'),
			}),
		];
	},
}).configure({
	allowBase64: true,
	HTMLAttributes: {
		class: cx('border-muted rounded-lg border'),
	},
});

const updatedImage = UpdatedImage.configure({
	HTMLAttributes: {
		class: cx('border-muted rounded-lg border'),
	},
});

const taskList = TaskList.configure({
	HTMLAttributes: {
		class: cx('not-prose pl-2'),
	},
});
const taskItem = TaskItem.configure({
	HTMLAttributes: {
		class: cx('my-4 flex items-start gap-2'),
	},
	nested: true,
});

const horizontalRule = HorizontalRule.configure({
	HTMLAttributes: {
		class: cx('border-muted-foreground mt-4 mb-6 border-t'),
	},
});

const starterKit = StarterKit.configure({
	bulletList: {
		HTMLAttributes: {
			class: cx('-mt-2 list-outside list-disc leading-3'),
		},
	},
	orderedList: {
		HTMLAttributes: {
			class: cx('-mt-2 list-outside list-decimal leading-3'),
		},
	},
	listItem: {
		HTMLAttributes: {
			class: cx('-mb-2 leading-normal'),
		},
	},
	blockquote: {
		HTMLAttributes: {
			class: cx('border-primary border-l-4'),
		},
	},
	codeBlock: {
		HTMLAttributes: {
			class: cx(
				'bg-popover text-muted-foreground rounded-md border p-5 font-mono font-medium',
			),
		},
	},
	code: {
		HTMLAttributes: {
			class: cx('rounded-md px-1.5 py-1 font-medium'),
			spellcheck: 'false',
		},
	},
	horizontalRule: false,
	dropcursor: {
		color: '#DBEAFE',
		width: 4,
	},
	gapcursor: false,
});

const codeBlockLowlight = CodeBlockLowlight.configure({lowlight});

const youtube = Youtube.configure({
	HTMLAttributes: {
		class: cx('border-muted rounded-lg border'),
	},
	inline: false,
});

const twitter = Twitter.configure({
	HTMLAttributes: {
		class: cx('not-prose'),
	},
	inline: false,
});

const mathematics = Mathematics.configure({
	HTMLAttributes: {
		class: cx('text-foreground hover:bg-accent cursor-pointer rounded p-1'),
	},
	katexOptions: {
		throwOnError: false,
	},
});

const characterCount = CharacterCount.configure();

const markdownExtension = MarkdownExtension.configure({
	html: true,
	tightLists: true,
	tightListClass: 'tight',
	bulletListMarker: '-',
	linkify: false,
	breaks: false,
	transformPastedText: false,
	transformCopiedText: false,
});

export const defaultExtensions = [
	starterKit,
	placeholder,
	tiptapLink,
	tiptapImage,
	updatedImage,
	taskList,
	taskItem,
	horizontalRule,
	aiHighlight,
	codeBlockLowlight,
	youtube,
	twitter,
	mathematics,
	characterCount,
	TiptapUnderline,
	markdownExtension,
	HighlightExtension,
	TextStyle,
	Color,
	CustomKeymap,
	GlobalDragHandle,
];
