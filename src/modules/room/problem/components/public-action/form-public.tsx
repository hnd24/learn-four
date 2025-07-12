'use client';

import {Button} from '@/components/ui/button';
import {DialogFooter} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useGetProblemById, useUpdateProblem} from '@/hook/data/problem';
import {cn} from '@/lib/utils';
import {LEVEL_PROBLEM} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoaderCircle} from 'lucide-react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {Id} from '../../../../../../convex/_generated/dataModel';
import {problemSchema, ProblemValues} from '../../schema/problem';
import LevelSelection from './level-selection';
import TopicSelection from './topic-selection';
type Props = {
	problemId: Id<'problems'>;
	onClose: () => void;
};

export default function FormPublishProblem({problemId, onClose}: Props) {
	const {data, isPending: loading} = useGetProblemById(problemId);
	const {mutate: updateProblem, isPending} = useUpdateProblem();
	const form = useForm<ProblemValues>({
		resolver: zodResolver(problemSchema),
		defaultValues: {
			name: '',
			level: 'easy',
			topicId: '',
		},
	});
	useEffect(() => {
		if (data) {
			form.reset({
				name: data.name,
				level: data.level as LEVEL_PROBLEM,
				topicId: data.topic?._id,
			});
		}
	}, [problemId, data, loading]);

	const onSubmit = (data: ProblemValues) => {
		// IMPORTANT
		updateProblem(
			{
				problemId,
				name: data.name,
				level: data.level,
				topicId: data.topicId as Id<'topics'>,
				status: 'public',
			},
			{
				onSuccess: () => {
					toast.success('Problem published successfully');
				},
				onError: error => {
					toast.error(`Failed to publish problem`);
					console.log('⚙️ Error publishing problem:', error);
				},
			},
		);
		onClose();
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
							<FormLabel>Problem Name</FormLabel>
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
								<LevelSelection value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="topicId"
					render={({field}) => (
						<FormItem>
							<FormLabel>Topic</FormLabel>
							<FormControl>
								<TopicSelection
									value={field.value as Id<'topics'>}
									onChange={field.onChange}
								/>
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
