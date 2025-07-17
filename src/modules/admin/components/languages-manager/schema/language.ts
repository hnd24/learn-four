import {z} from 'zod';

export const languageSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	idJude0: z.number().int().min(0, 'ID must be a positive integer'),
	value: z.string().min(1, 'Value is required'),
});

export type LanguageValues = z.infer<typeof languageSchema>;
