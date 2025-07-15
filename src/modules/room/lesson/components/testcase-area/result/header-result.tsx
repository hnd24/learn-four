import {cn, formatTime} from '@/lib/utils';
import {getOverallStatus} from '@/modules/room/lib/utils';
import {StatusResult} from '@/types';
import {useAtomValue} from 'jotai';
import {resultsAtom} from '../../../atom/result';

export const HeaderResult = () => {
	const results = useAtomValue(resultsAtom);
	const status = getOverallStatus(results);

	const runtime = Math.max(...results.map(r => r.runtime));

	return (
		<div className="flex-shrink-0 px-3 pt-2">
			<div className="flex items-center gap-4">
				<span
					className={cn(
						'text-xl font-medium',
						status === StatusResult.Accepted ? 'text-green-500' : 'text-red-500',
					)}>
					{status}
				</span>
				{runtime > 0 && (
					<span className="text-muted-foreground text-sm">
						Runtime: {formatTime(runtime)}
					</span>
				)}
			</div>
		</div>
	);
};
