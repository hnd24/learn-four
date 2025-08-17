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
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useAddLanguage, useGetLanguages, useUpdateLanguage} from '@/hook/data/language';
import {cn} from '@/lib/utils';
import {LanguageType} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {isEqual} from 'lodash';
import {Edit, Loader2, MessagesSquare, PlusCircle} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import LanguageDelete from './language-delete';
import {languageSchema, LanguageValues} from './schema/language';

export default function LanguagesManager() {
	const [open, setOpen] = useState<boolean>(false);
	const [editingLanguage, setEditingLanguage] = useState<LanguageType | null>(null);

	const {data: languages, isPending: loading} = useGetLanguages();
	const {mutate: add, isPending: pendingAdd} = useAddLanguage();
	const {mutate: update, isPending: pendingUpdate} = useUpdateLanguage();
	const [disabled, setDisabled] = useState<boolean>(false);

	useEffect(() => {
		setDisabled(pendingAdd || pendingUpdate);
	}, [pendingAdd, pendingUpdate]);

	const form = useForm<LanguageValues>({
		resolver: zodResolver(languageSchema),
		defaultValues: {
			name: '',
			idJude0: 0,
			value: '',
		},
	});

	useEffect(() => {
		if (editingLanguage) {
			form.reset({
				name: editingLanguage.name,
				idJude0: editingLanguage.idJude0,
				value: editingLanguage.value,
			});
		} else {
			form.reset({
				name: '',
				idJude0: 0,
				value: '',
			});
		}
	}, [editingLanguage, form]);

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			setEditingLanguage(null);
			form.reset();
		}
	};

	const handleEdit = (language: LanguageType) => {
		setEditingLanguage(language);
		setOpen(true);
	};

	const handleAddNew = () => {
		setEditingLanguage(null);
		setOpen(true);
	};

	const onSubmit = (values: LanguageValues) => {
		if (editingLanguage) {
			if (
				isEqual(values, {
					name: editingLanguage.name,
					idJude0: editingLanguage.idJude0,
					value: editingLanguage.value,
				})
			) {
				toast.error('No changes made to the language');
				return;
			}
			update(
				{
					languageId: editingLanguage._id,
					name: values.name,
					idJude0: values.idJude0,
					value: values.value,
				},
				{
					onSuccess: () => {
						toast.success('Language updated successfully');
					},
					onError: error => {
						toast.error(`Failed to update language`);
						console.error('⚙️ Error updating language:', error);
					},
				},
			);
		} else {
			add(values, {
				onSuccess: () => {
					toast.success('Language added successfully');
				},
				onError: error => {
					toast.error(`Failed to add language`);
					console.error('⚙️ Error adding language:', error);
				},
			});
		}
		setEditingLanguage(null);
		form.reset();
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button
					disabled={loading}
					size="icon"
					className="w-full flex items-center gap-2"
					onClick={() => {
						handleOpenChange(true);
					}}>
					<MessagesSquare /> Language
				</Button>
			</DialogTrigger>
			<DialogContent className=" flex flex-col ">
				<DialogHeader>
					<DialogTitle>Manage Languages</DialogTitle>
					<DialogDescription>
						You can add, edit, or delete languages as needed.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4 flex-1 overflow-hidden">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-lg font-semibold">Existing Languages</h3>
						<div>
							<Button
								className={cn(editingLanguage ? '' : 'hidden')}
								variant="outline"
								size="sm"
								onClick={handleAddNew}>
								<PlusCircle className="mr-2 h-4 w-4" /> New Language
							</Button>
						</div>
					</div>
					<ScrollArea className="h-48 w-full rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>ID </TableHead>
									<TableHead>Value</TableHead>
									<TableHead className="text-right" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{languages?.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={4}
											className="text-center text-muted-foreground">
											No languages found.
										</TableCell>
									</TableRow>
								) : (
									languages?.map(language => (
										<TableRow key={language._id}>
											<TableCell className="font-medium truncate">
												{language.name}
											</TableCell>
											<TableCell>{language.idJude0}</TableCell>
											<TableCell>{language.value}</TableCell>
											<TableCell className="text-right flex gap-2 justify-end">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleEdit(language)}>
													<Edit className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Button>
												<LanguageDelete
													languageId={language._id}
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
						{editingLanguage ? 'Edit Language Details' : 'Add New Language'}
					</h3>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div className="w-full flex flex-col gap-4">
								<FormField
									control={form.control}
									name="name"
									render={({field}) => (
										<FormItem>
											<FormLabel> Name</FormLabel>
											<FormControl>
												<Input
													className="w-full"
													placeholder="Enter language name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex gap-2 items-start">
									<FormField
										control={form.control}
										name="idJude0"
										render={({field}) => (
											<FormItem className="flex-1">
												<FormLabel>ID </FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="1, 2"
														{...field}
														onChange={e =>
															field.onChange(+(e.target.value || 0))
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="value"
										render={({field}) => (
											<FormItem className="flex-1">
												<FormLabel>Value </FormLabel>
												<FormControl>
													<Input
														placeholder="Enter language value"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<DialogFooter className="mt-6">
								<DialogClose asChild>
									<Button
										variant="outline"
										disabled={disabled}
										onClick={() => handleOpenChange(false)}>
										Cancel
									</Button>
								</DialogClose>
								<Button type="submit" disabled={disabled}>
									{disabled ? (
										<div className="flex gap-2">
											<Loader2 className="animate-spin" />
											Loading
										</div>
									) : editingLanguage ? (
										'Save Changes'
									) : (
										'Add Language'
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
