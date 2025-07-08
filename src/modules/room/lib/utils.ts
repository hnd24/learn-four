import {StatusResult, TestResult} from '@/types';
import isEqual from 'fast-deep-equal';

export function getErrorMessage(results: TestResult[]) {
	for (const result of results) {
		if (result.error.includes(StatusResult.RuntimeError)) {
			return StatusResult.RuntimeError;
		}
		if (result.error.includes(StatusResult.CompilationError)) {
			return StatusResult.CompilationError;
		}
		if (result.error.includes(StatusResult.Error)) {
			return StatusResult.Error;
		}

		if (result.error) {
			return 'Error';
		}
	}
	return '';
}

export function getOverallStatus(results: TestResult[]) {
	if (!results.length) {
		return null;
	}

	const errorMsg = getErrorMessage(results);
	if (errorMsg) {
		return errorMsg;
	}

	const hasTimeLimitExceeded = results.some(
		result => result.status === StatusResult.TimeLimitExceeded,
	);

	if (hasTimeLimitExceeded) {
		return StatusResult.TimeLimitExceeded;
	}

	const hasWrongAnswer = results.some(result => result.status !== StatusResult.Accepted);

	return hasWrongAnswer ? StatusResult.WrongAnswer : StatusResult.Accepted;
}

export function formatTime(value: number) {
	const numberFormatter = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 1,
	});

	if (value < 1) {
		return `${numberFormatter.format(value * 1000)} ms`;
	} else {
		return `${numberFormatter.format(value)} s`;
	}
}

export function wait(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function highlightRecursive(outputData: any, expectedData: any, isOutput: boolean): any {
	if (Array.isArray(outputData) && Array.isArray(expectedData)) {
		return outputData.map((item, i) => highlightRecursive(item, expectedData[i], isOutput));
	}

	if (
		outputData &&
		expectedData &&
		typeof outputData === 'object' &&
		typeof expectedData === 'object'
	) {
		const result: Record<string, any> = {};
		const allKeys = new Set([...Object.keys(outputData), ...Object.keys(expectedData)]);

		for (const key of allKeys) {
			result[key] = highlightRecursive(outputData[key], expectedData[key], isOutput);
		}
		return result;
	}

	const isDiff = !isEqual(outputData, expectedData);
	return {
		value: isOutput ? outputData : expectedData,
		color: isDiff ? (isOutput ? 'text-red-500' : 'text-green-500') : '',
	};
}

export function highlightDiff(output: string, expected: string) {
	if (output === expected) return {output, expected};

	try {
		const outputParsed = JSON.parse(output);
		const expectedParsed = JSON.parse(expected);

		const outputHighlighted = highlightRecursive(outputParsed, expectedParsed, true);
		const expectedHighlighted = highlightRecursive(expectedParsed, outputParsed, false);

		return {outputHighlighted, expectedHighlighted};
	} catch (err) {
		console.log('Invalid JSON input');
		return {output, expected};
	}
}
