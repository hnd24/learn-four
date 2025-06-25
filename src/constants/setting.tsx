import {LanguageType} from '@/types';

export enum LanguageEnum {
	English = 'English',
	Vietnamese = 'Vietnamese',
}

export const Language: Record<LanguageEnum, LanguageType> = {
	English: {
		value: 'English',
		label: 'English',
		image: '/icon/us-icon.svg',
	},
	Vietnamese: {
		value: 'Vietnamese',
		label: 'Việt Nam',
		image: '/icon/vietnam-icon.svg',
	},
};
