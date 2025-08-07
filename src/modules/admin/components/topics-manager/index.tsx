'use client';

import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useAddTopic, useGetTopics, useUpdateTopic} from '@/hook/data/topic';
import {TopicType} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {isEqual} from 'lodash';
import {Edit, Loader2, PanelLeft, PlusCircle} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {topicSchema, TopicValues} from './schema/topic';
import TopicDelete from './topic-delete';

export default function TopicsManager() {
	const {data: topics, isPending: loading} = useGetTopics(); // Using mock useGetTopics
	const {mutate: addTopic, isPending: pendingAdd} = useAddTopic();
	const {mutate: updateTopic, isPending: pendingUpdate} = useUpdateTopic();
	const [open, setOpen] = useState(false);
	const [editingTopic, setEditingTopic] = useState<TopicType | null>(null);
	const [disabled, setDisabled] = useState<boolean>(false);

	useEffect(() => {
		setDisabled(pendingAdd || pendingUpdate);
	}, [pendingAdd, pendingUpdate]);

	const form = useForm<TopicValues>({
		resolver: zodResolver(topicSchema),
		defaultValues: {
			name: '',
			status: editingTopic?.status ?? 'public',
		},
	});

	useEffect(() => {
		if (editingTopic) {
			form.reset({
				name: editingTopic.name,
				status: editingTopic.status,
			});
		} else {
			form.reset({
				name: '',
				status: 'public',
			});
		}
	}, [editingTopic, form]);

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			setEditingTopic(null);
			form.reset();
		}
	};

	const handleEdit = (topic: TopicType) => {
		setEditingTopic(topic);
		setOpen(true);
	};

	const handleAddNew = () => {
		setEditingTopic(null);
		setOpen(true);
	};

	const onSubmit = (values: TopicValues) => {
		if (editingTopic) {
			if (isEqual({name: editingTopic?.name, status: editingTopic?.status}, values)) {
				toast.error('No changes made to the topic');
				return;
			}
			updateTopic(
				{
					topicId: editingTopic._id,
					name: values.name,
					status: values.status,
				},
				{
					onSuccess: () => {
						toast.success('Topic updated successfully');
					},
					onError: error => {
						toast.error(`Failed to update topic`);
						console.error('⚙️ Error updating topic:', error);
					},
				},
			);
		} else {
			addTopic(values, {
				onSuccess: () => {
					toast.success('Topic added successfully');
				},
				onError: error => {
					toast.error(`Failed to add topic`);
					console.error('⚙️ Error adding topic:', error);
				},
			});
		}
		setEditingTopic(null);
		form.reset();
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button
					disabled={loading}
					size="icon"
					className="w-full flex items-center gap-2"
					onClick={() => {
						handleOpenChange(true);
					}}>
					<PanelLeft className="size-4" />
					Topics
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col ">
				<DialogHeader>
					<DialogTitle>Manage Topics</DialogTitle>
					<DialogDescription>
						You can add, edit, or delete topics as needed.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4 flex-1 overflow-hidden">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-lg font-semibold">Existing Topics</h3>
						<Button variant="outline" size="sm" onClick={handleAddNew}>
							<PlusCircle className="mr-2 h-4 w-4" /> New Topic
						</Button>
					</div>
					<ScrollArea className="h-48 w-full  border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{topics?.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={3}
											className="text-center text-muted-foreground">
											No topics found.
										</TableCell>
									</TableRow>
								) : (
									topics?.map(topic => (
										<TableRow key={topic._id}>
											<TableCell className="font-medium truncate">
												{topic.name}
											</TableCell>
											<TableCell>{topic.status}</TableCell>
											<TableCell className="text-right flex gap-2 justify-end">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleEdit(topic)}>
													<Edit className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Button>
												<TopicDelete
													topicId={topic._id}
													setDisabled={setDisabled}
												/>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</ScrollArea>

					<h3 className="text-lg font-semibold mt-4">
						{editingTopic ? 'Edit Topic Details' : 'Add New Topic'}
					</h3>
					<Form {...form} key={editingTopic?._id || 'default'}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div className="flex items-start gap-2">
								<FormField
									control={form.control}
									name="name"
									render={({field}) => (
										<FormItem className="flex-1">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Enter topic name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({field}) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="public">Public</SelectItem>
													<SelectItem value="private">Private</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<DialogFooter className="mt-6">
								<DialogClose asChild>
									<Button
										variant="outline"
										disabled={disabled}
										onClick={() => {
											handleOpenChange(false);
										}}>
										Cancel
									</Button>
								</DialogClose>
								<Button type="submit" disabled={disabled}>
									{disabled ? (
										<div className="flex items-center gap-2">
											<Loader2 className=" animate-spin" />
											Loading
										</div>
									) : editingTopic ? (
										'Save Changes'
									) : (
										'Add Topic'
									)}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
