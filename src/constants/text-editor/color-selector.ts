export type BubbleColorMenuItem = {
	name: string;
	color: string;
};

export const TEXT_COLORS: BubbleColorMenuItem[] = [
	{
		name: 'Default',
		color: '#000000', // Black
	},
	{
		name: 'Purple',
		color: '#8B5CF6', // Tailwind purple-500
	},
	{
		name: 'Red',
		color: '#EF4444', // Tailwind red-500
	},
	{
		name: 'Yellow',
		color: '#F59E42', // Tailwind yellow-500
	},
	{
		name: 'Blue',
		color: '#3B82F6', // Tailwind blue-500
	},
	{
		name: 'Green',
		color: '#22C55E', // Tailwind green-500
	},
	{
		name: 'Orange',
		color: '#F97316', // Tailwind orange-500
	},
	{
		name: 'Pink',
		color: '#EC4899', // Tailwind pink-500
	},
	{
		name: 'Gray',
		color: '#6B7280', // Tailwind gray-500
	},
];

export const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
	{
		name: 'Default',
		color: 'var(--novel-highlight-default)',
	},
	{
		name: 'Purple',
		color: 'var(--novel-highlight-purple)',
	},
	{
		name: 'Red',
		color: 'var(--novel-highlight-red)',
	},
	{
		name: 'Yellow',
		color: 'var(--novel-highlight-yellow)',
	},
	{
		name: 'Blue',
		color: 'var(--novel-highlight-blue)',
	},
	{
		name: 'Green',
		color: 'var(--novel-highlight-green)',
	},
	{
		name: 'Orange',
		color: 'var(--novel-highlight-orange)',
	},
	{
		name: 'Pink',
		color: 'var(--novel-highlight-pink)',
	},
	{
		name: 'Gray',
		color: 'var(--novel-highlight-gray)',
	},
];
