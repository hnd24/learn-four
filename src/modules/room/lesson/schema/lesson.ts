import {z} from 'zod';

export const lessonSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	level: z.enum(['easy', 'medium', 'hard']),
});

export type LessonValues = z.infer<typeof lessonSchema>;
