import {SYSTEM_PROMPTS} from '@/constants/text-editor/system-prompts';
import {CoreMessage} from 'ai';

export function isValidUrl(url: string) {
	try {
		new URL(url);
		return true;
	} catch (_e) {
		return false;
	}
}

export function getUrlFromString(str: string) {
	if (isValidUrl(str)) return str;
	try {
		if (str.includes('.') && !str.includes(' ')) {
			return new URL(`https://${str}`).toString();
		}
	} catch (_e) {
		return null;
	}
}

export function buildMessages(option: string, prompt: string, command?: string): CoreMessage[] {
	if (option === 'zap') {
		return [
			{
				role: 'system',
				content: SYSTEM_PROMPTS.zap.join(' '),
			},
			{
				role: 'user',
				content: `For this text:\n${prompt}\nApply the following command:\n${command}`,
			},
		];
	}

	return [
		{
			role: 'system',
			content: SYSTEM_PROMPTS[option]?.join(' ') ?? '',
		},
		{
			role: 'user',
			content: prompt,
		},
	];
}
