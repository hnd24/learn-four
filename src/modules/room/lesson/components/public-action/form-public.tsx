'use client';

import {Button} from '@/components/ui/button';
import {DialogFooter} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useGetLessonById, useUpdateLesson} from '@/hook/data/lesson';
import {cn} from '@/lib/utils';
import {LEVEL_LESSON} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoaderCircle} from 'lucide-react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {Id} from '../../../../../../convex/_generated/dataModel';
import {lessonSchema, LessonValues} from '../../schema/lesson';
import LevelSelect from './level-select';
type Props = {
	lessonId: Id<'lessons'>;
	onClose: () => void;
};

export default function FormPublishLesson({lessonId, onClose}: Props) {
	const {data, isPending: loading} = useGetLessonById(lessonId);
	const {mutate: updateLesson, isPending} = useUpdateLesson();
	const form = useForm<LessonValues>({
		resolver: zodResolver(lessonSchema),
		defaultValues: {
			name: '',
			level: 'easy',
		},
	});
	useEffect(() => {
		if (data) {
			form.reset({
				name: data.name,
				level: data.level as LEVEL_LESSON,
			});
		}
	}, [lessonId, data, loading]);

	const onSubmit = (data: LessonValues) => {
		updateLesson(
			{
				lessonId,
				name: data.name,
				level: data.level,
				status: 'public',
			},
			{
				onSuccess: () => {
					toast.success('Lesson published successfully');
					onClose();
				},
				onError: error => {
					toast.error(`Failed to publish lesson`);
					console.log('⚙️ Error publishing lesson:', error);
				},
			},
		);
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Lesson Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter document name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="level"
					render={({field}) => (
						<FormItem>
							<FormLabel>Difficulty Level</FormLabel>
							<FormControl>
								<LevelSelect value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isPending}>
						<LoaderCircle
							className={cn('hidden mr-2 size-4 animate-spin', isPending && 'flex')}
						/>
						Publish
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
