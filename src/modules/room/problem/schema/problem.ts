import {z} from 'zod';

export const problemSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	level: z.enum(['easy', 'medium', 'hard']),
	topicId: z.string().min(1, 'Topic is required'),
});

export type ProblemValues = z.infer<typeof problemSchema>;
