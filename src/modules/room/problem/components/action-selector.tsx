import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';

type Props = {
	children?: React.ReactNode;
	title: string;
	onClick?: () => void;
	disabled?: boolean;
};

export const ActionSelector = ({children, title, disabled = false, onClick}: Props) => {
	return (
		<Hint label={title}>
			<Button
				size="icon"
				variant="ghost"
				className="dark:hover:bg-input/50 size-8 rounded-sm"
				onClick={onClick}
				disabled={disabled}>
				{children}
			</Button>
		</Hint>
	);
};
