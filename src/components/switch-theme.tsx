'use client';

import {cn} from '@/lib/utils';
import {Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';
import {Hint} from './hint';
import {Button} from './ui/button';

type Props = {
	className?: string;
	word?: boolean;

	size?: number;
};

export default function SwitchTheme({className, word = false, size = 16}: Props) {
	const {theme, setTheme} = useTheme();
	return (
		<>
			<Hint label="switch theme">
				<Button
					className={cn(
						'!text-white font-semibold w-full',
						'dark:bg-indigo-900 dark:hover:bg-indigo-950',
						'bg-sunsetCoral hover:bg-darkSunsetCoral ',
						className,
					)}
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
					{theme === 'dark' ? (
						word ? (
							'Dark mode'
						) : (
							<Moon size={size} />
						)
					) : word ? (
						'Light mode'
					) : (
						<Sun size={size} />
					)}
				</Button>
			</Hint>
		</>
	);
}
