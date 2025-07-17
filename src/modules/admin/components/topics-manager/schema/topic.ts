import {z} from 'zod';

export const topicSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	status: z.enum(['public', 'private']),
});

export type TopicValues = z.infer<typeof topicSchema>;
