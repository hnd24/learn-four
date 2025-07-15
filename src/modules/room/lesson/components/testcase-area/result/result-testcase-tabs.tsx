import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {StatusResult} from '@/types';
import {useAtomValue} from 'jotai';
import {resultsAtom} from '../../../atom/result';

type Props = {
	active: string;
	onChange: (value: string) => void;
};

export default function ResultTestcaseTabs({active, onChange}: Props) {
	const results = useAtomValue(resultsAtom);

	return (
		<div className="flex-shrink-0 px-3">
			<div className="flex flex-wrap items-center gap-2 shadow-xs">
				{results.map((result, index) => (
					<Button
						key={result.testCaseId}
						variant="ghost"
						size="sm"
						onClick={() => onChange(result.testCaseId)}
						className={cn(
							'hover:!bg-ring h-auto cursor-pointer rounded-sm px-4 py-1',
							active === result.testCaseId && 'bg-ring/60',
						)}>
						<div
							className={cn(
								'size-1 rounded-full',
								result.status === StatusResult.Accepted
									? 'bg-green-400'
									: 'bg-red-500',
							)}
						/>
						Case {index + 1}
					</Button>
				))}
			</div>
		</div>
	);
}
