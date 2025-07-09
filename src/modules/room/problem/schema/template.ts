import {z} from 'zod';

export const templateSchema = z.object({
	head: z.string(),
	body: z.string(),
	tail: z.string(),
});

export type TemplateValues = z.infer<typeof templateSchema>;
