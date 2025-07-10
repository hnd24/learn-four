import {useCopyToClipboard} from '@/hook/use-copy-to-clipboard';
import {cn} from '@/lib/utils';
import {Check, Copy} from 'lucide-react';
import {Hint} from './hint';
import {Button} from './ui/button';

type Props = {
	value: string;
	onCopy?: () => void;
	timeout?: number;
	className?: HTMLButtonElement['className'];
};

export const ButtonCopy = ({value, onCopy, timeout, className}: Props) => {
	const {isCopied, copyToClipboard} = useCopyToClipboard({
		timeout,
		onCopy,
	});

	return (
		<Hint label={isCopied ? 'Copied!' : 'Copy'}>
			<Button
				className={cn('size-6 rounded border', className)}
				size="icon"
				variant="ghost"
				onClick={() => copyToClipboard(value)}>
				{isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
			</Button>
		</Hint>
	);
};
