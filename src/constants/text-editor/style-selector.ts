import {TextEditor} from '@/types';
import {
	BoldIcon,
	CodeIcon,
	ItalicIcon,
	type LucideIcon,
	StrikethroughIcon,
	UnderlineIcon,
} from 'lucide-react';

export type StyleSelectorItem = {
	name: string;
	icon: LucideIcon;
	command: (editor: TextEditor) => void;
	isActive: (editor: TextEditor) => boolean;
};

export const STYLE_SELECTOR_ITEMS: StyleSelectorItem[] = [
	{
		name: 'bold',
		isActive: editor => editor?.isActive('bold') ?? false,
		command: editor => editor?.chain().focus().toggleBold().run(),
		icon: BoldIcon,
	},
	{
		name: 'italic',
		isActive: editor => editor?.isActive('italic') ?? false,
		command: editor => editor?.chain().focus().toggleItalic().run(),
		icon: ItalicIcon,
	},
	{
		name: 'underline',
		isActive: editor => editor?.isActive('underline') ?? false,
		command: editor => editor?.chain().focus().toggleUnderline().run(),
		icon: UnderlineIcon,
	},
	{
		name: 'strike',
		isActive: editor => editor?.isActive('strike') ?? false,
		command: editor => editor?.chain().focus().toggleStrike().run(),
		icon: StrikethroughIcon,
	},
	{
		name: 'code',
		isActive: editor => editor?.isActive('code') ?? false,
		command: editor => editor?.chain().focus().toggleCode().run(),
		icon: CodeIcon,
	},
];
