'use client';

import {Button} from '@/components/ui/button';
import {useGetLessonById} from '@/hook/data/lesson';
import {useAtomValue, useSetAtom} from 'jotai';
import {Plus} from 'lucide-react';
import {statusLessonAtom} from '../../../atom/status';
import {testCasesFamilyAtom} from '../../../atom/testcase';
import {activeTestCaseIdAtom} from '../../../atom/testcase/active';
import {
	addInputToTestCase,
	removeInputFromTestCase,
	updateExpectedInTestCase,
	updateInputInTestCase,
} from '../../../atom/testcase/input';
import {useLessonId} from '../../../hook/use-lesson-id';
import {InputSection} from './input-section';

export default function TestcaseInputs() {
	const lessonId = useLessonId();
	const activeTestCaseId = useAtomValue(activeTestCaseIdAtom);
	const currentTestCase = useAtomValue(testCasesFamilyAtom(activeTestCaseId));

	const add = useSetAtom(addInputToTestCase);
	const remove = useSetAtom(removeInputFromTestCase);
	const update = useSetAtom(updateInputInTestCase);
	const updateExpected = useSetAtom(updateExpectedInTestCase);
	const status = useAtomValue(statusLessonAtom);

	const {data: lesson, isPending} = useGetLessonById(lessonId);
	if (!currentTestCase || !lesson || isPending) {
		return null;
	}

	return (
		<div className="space-y-3" key={activeTestCaseId}>
			{currentTestCase.inputs.map(input => (
				<InputSection
					key={input.id}
					input={input}
					canRemove={currentTestCase.inputs.length > 1 && status !== 'public'}
					onUpdate={(value, field) => update(input.id, field, value)}
					onRemove={() => remove(input.id)}
				/>
			))}

			<Button
				variant="ghost"
				size="sm"
				onClick={add}
				className=" cursor-pointer gap-1  rounded-sm text-xs">
				<Plus className="size-3" />
				Add Parameter
			</Button>

			<InputSection
				input={{
					label: 'expected',
					value: currentTestCase.expected,
				}}
				canRemove={false}
				editableLabel={false}
				onUpdate={value => updateExpected(value)}
			/>
		</div>
	);
}
