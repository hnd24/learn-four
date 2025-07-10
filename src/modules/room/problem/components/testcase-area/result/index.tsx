import {ScrollArea} from '@/components/ui/scroll-area';
import {getErrorMessage, highlightDiff} from '@/modules/room/lib/utils';
import {StatusResult} from '@/types';
import {useAtomValue} from 'jotai';
import {useState} from 'react';
import {resultsAtom} from '../../../atom/result';
import {testCasesFamilyAtom} from '../../../atom/testcase';
import EmptyResultDisplay from './empty-result-display';
import {ErrorDisplay} from './error-display';
import {HeaderResult} from './header-results';
import OutputSection from './output-section';
import ResultInputs from './result-inputs';
import ResultTestcaseTabs from './result-testcase-tabs';

export default function Result() {
	const results = useAtomValue(resultsAtom);

	const [activeResultCase, setActiveResultCase] = useState(results[0]?.testCaseId);

	const currentResultTestCase = useAtomValue(testCasesFamilyAtom(activeResultCase));

	const hasError = getErrorMessage(results) !== '';

	const currentResult = results.find(r => r.testCaseId === activeResultCase);

	if (results.length === 0 || !currentResult) {
		return <EmptyResultDisplay />;
	}

	if (hasError) {
		return <ErrorDisplay />;
	}

	const diff = highlightDiff(currentResult.output, currentResult.expected);
	console.log('🚀 ~ Result ~ diff:', diff);
	console.log('🚀 ~ Result ~ currentResult:', currentResult);
	const isShow = currentResult.status !== StatusResult.TimeLimitExceeded;

	return (
		<div className="flex h-full flex-col gap-y-4">
			<HeaderResult />

			<ResultTestcaseTabs active={activeResultCase} onChange={setActiveResultCase} />

			<div className="flex-1 overflow-hidden">
				<ScrollArea className="h-full px-3">
					{currentResult && currentResultTestCase && (
						<div className="space-y-4 pb-4 pt-0">
							<ResultInputs values={currentResultTestCase.inputs} />

							{isShow && (
								<>
									<OutputSection
										label="Output"
										value={currentResult.output}
										diff={diff.outputHighlighted}
									/>

									<OutputSection
										label="Expected"
										value={currentResult.expected}
										diff={diff.expectedHighlighted}
									/>
								</>
							)}
						</div>
					)}
				</ScrollArea>
			</div>
		</div>
	);
}
