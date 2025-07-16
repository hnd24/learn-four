'use client';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

type Props = {
	label: string;
	side?: 'top' | 'bottom' | 'left' | 'right';
	sideOffset?: number;
	children: React.ReactNode;
};

export const Hint = ({label, side = 'top', sideOffset = 10, children}: Props) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} sideOffset={sideOffset}>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
