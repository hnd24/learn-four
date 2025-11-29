import {runBatchedCodeWithJudge0} from '@/modules/room/actions/execute';
import {generateStdinFromInputs} from '@/modules/room/lib/execute';
import {TestCaseTab} from '@/types';
import {atom} from 'jotai';
import {toast} from 'sonner';
import {resultsAtom} from '.';
import {languagesAtom} from '../language';
import {activeTabAtom} from '../tab';
import {rawTestCaseAtoms, testCasesAtoms} from '../testcase';

export const executingAtom = atom<boolean>(false);

export const executeCodeAtom = atom(null, async (get, set, code: string) => {
	const language = get(languagesAtom);
	const publicTestCases = get(testCasesAtoms);
	const rawTestCases = get(rawTestCaseAtoms);
	const testCases = [...publicTestCases, ...rawTestCases].filter(
		(tc, idx, arr) => arr.findIndex(t => t.id === tc.id) === idx,
	);
	if (!language) {
		toast.error('No language selected');
		return;
	}
	try {
		set(executingAtom, true);
		set(activeTabAtom, TestCaseTab.Result);

		const submissions = testCases.map(testCase => ({
			languageIdJudge0: language?.idJude0,
			sourceCode: code,
			stdin: generateStdinFromInputs(testCase.inputs),
			expectedOutput: testCase.expected,
		}));
		// IMPORTANT
		const batchedResults = await runBatchedCodeWithJudge0(submissions);

		console.log('🚀 ~ executeCodeAtom ~ batchedResults:', batchedResults);

		const resultsData = batchedResults.map((result, index) => {
			const testCase = testCases[index];
			const output = (result.stdout || '').trim();
			const expected = testCase.expected;
			const runtime = parseFloat(result.time || '0');
			const error = result.error || result.stderr || result.compile_output || '';

			return {
				testCaseId: testCase.id,
				status: result.status?.description || 'Error',
				output,
				expected,
				error,
				runtime,
			};
		});
		set(resultsAtom, resultsData);
	} catch (error) {
		console.log('Error running code:', error);
		toast.error(
			'Error running code: ' + (error instanceof Error ? error.message : String(error)),
		);
	} finally {
		set(executingAtom, false);
	}
});
