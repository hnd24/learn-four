import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {useAtomValue, useSetAtom} from 'jotai';
import {X} from 'lucide-react';
import {removeTestCaseAtom, testCasesFamilyAtom} from '../../../atom/testcase';
import {activeTestCaseIdAtom} from '../../../atom/testcase/active';

type Props = {
	id: string;
	active: boolean;
	index: number;
	canRemove?: boolean;
};

export const TestCaseTab = ({id, active, index, canRemove = false}: Props) => {
	const testCase = useAtomValue(testCasesFamilyAtom(id));
	const remove = useSetAtom(removeTestCaseAtom);
	const setActiveTestCaseId = useSetAtom(activeTestCaseIdAtom);

	if (!testCase) return null;

	return (
		<div key={testCase.id} className="group relative">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => setActiveTestCaseId(testCase.id)}
				className={cn(
					'hover:!bg-ring group-hover:bg-ring h-auto cursor-pointer rounded-sm px-4 py-1',
					active && 'bg-ring group-hover:bg-ring/80',
				)}>
				Case {index + 1}
			</Button>
			{canRemove && (
				<button
					className="bg-muted-foreground absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/3 cursor-pointer rounded-full p-0.5 group-hover:block"
					onClick={() => remove(testCase.id)}>
					<X className="size-2.5" />
				</button>
			)}
		</div>
	);
};
