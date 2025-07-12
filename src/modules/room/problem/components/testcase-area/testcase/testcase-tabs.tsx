import {Hint} from '@/components/hint';
import {Button} from '@/components/ui/button';
import {useAtomValue, useSetAtom} from 'jotai';
import {Plus} from 'lucide-react';
import {statusProblemAtom} from '../../../atom/status';
import {cloneTestCaseAtom, testCaseIdsAtom} from '../../../atom/testcase';
import {activeTestCaseIdAtom} from '../../../atom/testcase/active';
import {TestCaseTab} from './testcase-tab';
export default function TestcaseTabs() {
	const testCaseIds = useAtomValue(testCaseIdsAtom);
	const cloneTestCase = useSetAtom(cloneTestCaseAtom);
	const activeId = useAtomValue(activeTestCaseIdAtom);
	const status = useAtomValue(statusProblemAtom);
	const displayedTestCaseIds = status === 'public' ? testCaseIds.slice(0, 3) : testCaseIds;
	return (
		<div className="flex-1 shrink-0">
			<div className="flex flex-wrap items-center gap-x-2 gap-y-4">
				{displayedTestCaseIds.map((id, index) => (
					<TestCaseTab
						key={index}
						id={id}
						index={index}
						active={id === activeId}
						canRemove={testCaseIds.length > 1}
					/>
				))}

				<Hint label="Clone current testcase" side="right">
					<Button
						variant="ghost"
						size="icon"
						onClick={cloneTestCase}
						className="-ml-1 size-7 cursor-pointer">
						<Plus />
					</Button>
				</Hint>
			</div>
		</div>
	);
}
