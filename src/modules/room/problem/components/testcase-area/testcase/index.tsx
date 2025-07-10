import {ScrollArea} from '@/components/ui/scroll-area';
import SaveTestcasesBtn from './save-testcases-btn';
import TestcaseInputs from './testcase-inputs';
import TestcaseTabs from './testcase-tabs';

export default function Testcase() {
	return (
		<div className="flex h-full flex-col">
			<div className="flex items-start justify-between gap-2 px-4 py-2">
				<TestcaseTabs />
				<SaveTestcasesBtn />
			</div>

			<div className="flex-1 overflow-hidden ">
				<ScrollArea className="h-full">
					<div className="p-4 pt-0">
						<TestcaseInputs />
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
