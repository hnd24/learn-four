import {Logo} from '@/components/logo';
import {ProblemDetailType} from '@/types';

type Props = {
	problem: ProblemDetailType;
};

export default function Header({problem}: Props) {
	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link="/admin" />

				<div className="w-1/3 px-4">{/* TODO: Title */}</div>

				<div className="flex items-center gap-x-3">
					{/* TODO: Avatar Stack */}
					<div className="hidden md:block"></div>

					{/* TODO: Switch status button */}
				</div>
			</div>
		</header>
	);
}
