import {cn} from '@/lib/utils';
import {Loader2} from 'lucide-react';
type Props = {
	className?: string;
	children?: React.ReactNode;
	label?: string;
};

export default function LoadingState({className, children, label = 'Loading...'}: Props) {
	return (
		<div className={cn('size-full flex flex-col gap-3 items-center justify-center', className)}>
			{children || <Loader2 className="size-40 animate-spin text-muted-foreground" />}

			<p className="text-muted-foreground text-2xl">{label}</p>
		</div>
	);
}
