import {Logo} from '@/components/logo';
import {ProblemDetailType} from '@/types';
import {PublishButton} from './publish-btn';
import Title from './title';

type Props = {
	problem: ProblemDetailType;
};

export default function Header({problem}: Props) {
	return (
		<header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
			<div className="flex size-full items-center justify-between px-4 py-3">
				<Logo className="hidden lg:block" link="/admin" />

				<div className="w-1/3 px-4">
					<Title problemId={problem._id} title={problem.name} />
				</div>

				<div className="flex items-center gap-x-3">
					{/* TODO: Avatar Stack */}
					<div className="hidden md:block"></div>

					<div className="md:mr-6">
						<PublishButton problemId={problem._id} status={problem.status} />
					</div>
				</div>
			</div>
		</header>
	);
}
