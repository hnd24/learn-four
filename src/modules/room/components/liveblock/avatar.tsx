import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import Image from 'next/image';

type Props = {
	src: string;
	name: string;
	color: string;
};

export const Avatar = ({src, name, color}: Props) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<div
					className="-ml-2 flex size-8 shrink-0 rounded-full border-3"
					style={{borderColor: color}}>
					<Image
						src={src}
						alt={name}
						width={36}
						height={36}
						className="size-full rounded-full object-center"
					/>
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<p>{name}</p>
			</TooltipContent>
		</Tooltip>
	);
};
