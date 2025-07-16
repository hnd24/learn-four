import {TextEditor} from '@/types';
import {
	CheckSquare,
	Code,
	Heading1,
	Heading2,
	Heading3,
	ListOrdered,
	type LucideIcon,
	TextIcon,
	TextQuote,
} from 'lucide-react';

export type NodeSelectorItem = {
	name: string;
	icon: LucideIcon;
	command: (editor: TextEditor) => void;
	isActive: (editor: TextEditor) => boolean;
};

export const NODE_SELECTOR_ITEMS: NodeSelectorItem[] = [
	{
		name: 'Text',
		icon: TextIcon,
		command: editor => editor?.chain().focus().clearNodes().run(),
		isActive: editor =>
			(editor?.isActive('paragraph') &&
				!editor?.isActive('bulletList') &&
				!editor?.isActive('orderedList')) ??
			false,
	},
	{
		name: 'Heading 1',
		icon: Heading1,
		command: editor => editor?.chain().focus().clearNodes().toggleHeading({level: 1}).run(),
		isActive: editor => editor?.isActive('heading', {level: 1}) ?? false,
	},
	{
		name: 'Heading 2',
		icon: Heading2,
		command: editor => editor?.chain().focus().clearNodes().toggleHeading({level: 2}).run(),
		isActive: editor => editor?.isActive('heading', {level: 2}) ?? false,
	},
	{
		name: 'Heading 3',
		icon: Heading3,
		command: editor => editor?.chain().focus().clearNodes().toggleHeading({level: 3}).run(),
		isActive: editor => editor?.isActive('heading', {level: 3}) ?? false,
	},
	{
		name: 'To-do List',
		icon: CheckSquare,
		command: editor => editor?.chain().focus().clearNodes().toggleTaskList().run(),
		isActive: editor => editor?.isActive('taskItem') ?? false,
	},
	{
		name: 'Bullet List',
		icon: ListOrdered,
		command: editor => editor?.chain().focus().clearNodes().toggleBulletList().run(),
		isActive: editor => editor?.isActive('bulletList') ?? false,
	},
	{
		name: 'Numbered List',
		icon: ListOrdered,
		command: editor => editor?.chain().focus().clearNodes().toggleOrderedList().run(),
		isActive: editor => editor?.isActive('orderedList') ?? false,
	},
	{
		name: 'Quote',
		icon: TextQuote,
		command: editor => editor?.chain().focus().clearNodes().toggleBlockquote().run(),
		isActive: editor => editor?.isActive('blockquote') ?? false,
	},
	{
		name: 'Code',
		icon: Code,
		command: editor => editor?.chain().focus().clearNodes().toggleCodeBlock().run(),
		isActive: editor => editor?.isActive('codeBlock') ?? false,
	},
];
