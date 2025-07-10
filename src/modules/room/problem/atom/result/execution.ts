import {runBatchedCode} from '@/modules/room/actions/execute';
import {generateStdinFromInputs} from '@/modules/room/lib/execute';
import {atom} from 'jotai';
import {toast} from 'sonner';
import {resultsAtom} from '.';
import {TestCaseTab} from '../../types';
import {languagesAtom} from '../language';
import {activeTabAtom} from '../tab';
import {testCasesAtoms} from '../testcase';

export const executingAtom = atom<boolean>(false);

export const executeCodeAtom = atom(null, async (get, set, code: string) => {
	console.log('🚀 ~ executeCodeAtom ~ code:', code);
	const language = get(languagesAtom);
	const testCases = get(testCasesAtoms);
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
		const batchedResults = await runBatchedCode(submissions);

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
