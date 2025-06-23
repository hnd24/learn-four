import {cn} from '@/lib/utils';
import {LucideIcon} from 'lucide-react';

type Props = {
	children?: React.ReactNode;
	title: string;
	icon: LucideIcon;
	isActive: boolean;
	onClick: () => void;
};

export const SidebarItem = ({title, icon: Icon, isActive, onClick, children}: Props) => {
	return (
		<div
			className={cn(
				"group hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				isActive && 'bg-accent text-accent-foreground',
			)}
			onClick={onClick}>
			<div className="mr-auto flex items-center gap-2 capitalize">
				<Icon />
				{title}
			</div>
			{children}
		</div>
	);
};
