'use server';

import {JUDGE0_LANGUAGE_ID_MAP, MAX_RETRIES, RETRY_DELAY_MS} from '@/constants';
import {ApiResponse, BatchedApiResponse} from '@/types';
import {wait} from '../lib/utils';

type Props = {
	languageIdJudge0: number;
	sourceCode: string;
	stdin?: string;
	expectedOutput?: string;
};

export const runCode = async ({languageIdJudge0, sourceCode, stdin, expectedOutput}: Props) => {
	const response = await fetch(
		`${process.env.SERVER_EXECUTION_URL}/submissions?base64_encoded=false&wait=true`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				language_id: languageIdJudge0,
				source_code: sourceCode,
				stdin,
				expected_output: expectedOutput,
				cpu_time_limit: 1.0,
				cpu_extra_time: 0.5,
				wall_time_limit: 2.0,
			}),
		},
	);

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Execution error: ${response.status} - ${text}`);
	}

	const result = await response.json();
	return result as ApiResponse;
};

export const runCodeWithJudge0 = async ({
	languageIdJudge0,
	sourceCode,
	stdin,
	expectedOutput,
}: Props) => {
	const response = await fetch(
		`https://${process.env.RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=true`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
				'X-RapidAPI-Host': process.env.RAPIDAPI_HOST || '',
			},
			body: JSON.stringify({
				language_id: languageIdJudge0,
				source_code: sourceCode,
				stdin,
				expected_output: expectedOutput,
			}),
		},
	);

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Execution error: ${response.status} - ${text}`);
	}

	const result = await response.json();

	return result as ApiResponse;
};

export const runBatchedCode = async (submissions: Props[]) => {
	const response = await fetch(
		`${process.env.SERVER_EXECUTION_URL}/submissions/batch?base64_encoded=false`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				submissions: submissions.map(s => ({
					language_id: s.languageIdJudge0,
					source_code: s.sourceCode,
					stdin: s.stdin,
					expected_output: s.expectedOutput,
				})),
			}),
		},
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Batched execution failed: ${errorText}`);
	}

	const results = (await response.json()) as ApiResponse[];
	const tokens = results.map(r => r.token).join(',');

	const url = `${process.env.SERVER_EXECUTION_URL}/submissions/batch?base64_encoded=false&tokens=${tokens}`;

	return await pollingGetSubmissions(url);
};

export const runBatchedCodeWithJudge0 = async (submissions: Props[]) => {
	const response = await fetch(
		`https://${process.env.RAPIDAPI_HOST}/submissions/batch?base64_encoded=false`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
				'X-RapidAPI-Host': process.env.RAPIDAPI_HOST || '',
			},
			body: JSON.stringify({
				submissions: submissions.map(s => ({
					language_id: JUDGE0_LANGUAGE_ID_MAP[s.languageIdJudge0],
					source_code: s.sourceCode,
					stdin: s.stdin,
					expected_output: s.expectedOutput,
				})),
			}),
		},
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Batched execution failed: ${errorText}`);
	}

	const results = (await response.json()) as ApiResponse[];
	const tokens = results.map(r => r.token).join(',');

	const url = `https://${process.env.RAPIDAPI_HOST}/submissions/batch?base64_encoded=false&tokens=${tokens}`;

	return await pollingGetSubmissions(url);
};

export async function pollingGetSubmissions(url: string) {
	for (let i = 0; i < MAX_RETRIES; i++) {
		await wait(RETRY_DELAY_MS);
		const submissions = await getSubmissions(url);
		if (submissions) return submissions;
	}

	throw new Error(`Polling submissions failed after ${MAX_RETRIES} retries`);
}

export async function getSubmissions(url: string) {
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
			'X-RapidAPI-Host': process.env.RAPIDAPI_HOST || '',
		},
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`Get submissions failed: ${errorText}`);
	}

	const data = (await res.json()) as BatchedApiResponse;
	const allDone = data.submissions.every(s => s.status.id >= 3);
	console.log('🚀 ~ getSubmissions ~ submissions:', data.submissions);

	return allDone ? data.submissions : null;
}
