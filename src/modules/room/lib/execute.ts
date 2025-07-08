import {InputTestCaseType} from '@/types';

export function generateStdinFromInputs(inputs: InputTestCaseType[]): string {
	return inputs.map(input => input.value).join('\n');
}
