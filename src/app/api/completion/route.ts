import {buildMessages} from '@/lib/text-editor/utils';
import {openai} from '@ai-sdk/openai';
import {streamText} from 'ai';
import {match} from 'ts-pattern';

export async function POST(req: Request) {
	if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
		return new Response('Missing OPENAI_API_KEY - make sure to add it to your .env file.', {
			status: 400,
		});
	}

	const {prompt, option, command} = await req.json();
	const cleanPrompt = prompt.replace(/<\/?[^>]+(>|$)/g, '');

	const messages = match(option)
		.with('continue', 'improve', 'shorter', 'longer', 'fix', 'zap', 'solution', () =>
			buildMessages(option, cleanPrompt, command),
		)
		.otherwise(() => {
			throw new Error(`Unsupported option: ${option}`);
		});

	const result = streamText({
		messages,
		maxTokens: 4096,
		temperature: 0.7,
		topP: 1,
		frequencyPenalty: 0,
		presencePenalty: 0,
		model: openai('gpt-4o-mini'),
	});

	return result.toDataStreamResponse();
}
