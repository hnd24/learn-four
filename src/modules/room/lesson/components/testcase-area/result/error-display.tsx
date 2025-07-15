import {ButtonCopy} from '@/components/button-copy';
import {ScrollArea} from '@/components/ui/scroll-area';
import {firaCode} from '@/lib/font';
import {cn} from '@/lib/utils';
import {getErrorMessage} from '@/modules/room/lib/utils';
import {useAtomValue} from 'jotai';
import {ChevronsDown, ChevronsUp} from 'lucide-react';
import {useState} from 'react';
import {resultsAtom} from '../../../atom/result';

export const ErrorDisplay = () => {
	const results = useAtomValue(resultsAtom);
	const errorMsg = getErrorMessage(results);

	const error = results.find(r => r.error)?.error || 'Something went wrong';
	const [isExpanded, setIsExpanded] = useState(false);
	const maxLines = 5;
	const lines = error.split('\n');
	const shouldShowToggle = lines.length > maxLines;
	const displayLines = isExpanded ? lines : lines.slice(0, maxLines);
	return (
		<div className="flex h-full flex-col gap-y-4">
			<div className="flex-shrink-0 px-3 pt-2">
				<p className="text-xl font-medium text-red-500">{errorMsg || 'Error'}</p>
			</div>
			<div className="flex-1 overflow-hidden">
				<ScrollArea className="h-full px-3">
					<div className="group relative mb-4 rounded-md bg-red-300/10">
						<ButtonCopy
							value={error}
							className="invisible absolute top-2 right-2 group-hover:visible"
						/>
						<div className="p-3">
							<pre
								className={cn(
									'text-xs whitespace-pre-wrap text-red-400',
									firaCode.className,
								)}>
								{displayLines.join('\n')}
							</pre>
						</div>
						{shouldShowToggle && (
							<div className="flex items-center justify-center px-3 py-2">
								<button
									onClick={() => setIsExpanded(!isExpanded)}
									className="text-muted-foreground flex cursor-pointer items-center gap-1 text-xs [&_svg]:size-3">
									{isExpanded ? (
										<>
											<ChevronsUp />
											View less
										</>
									) : (
										<>
											<ChevronsDown />
											View more
										</>
									)}
								</button>
							</div>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
