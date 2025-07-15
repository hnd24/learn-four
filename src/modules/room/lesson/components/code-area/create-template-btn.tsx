'use client';
import {ActionSelector} from '@/components/action-selector';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Textarea} from '@/components/ui/textarea';
import {useGetLessonTemplate, useUpdateLesson} from '@/hook/data/lesson';
import {cn} from '@/lib/utils';
import {useAtomValue} from 'jotai';
import {FileCode, Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {useLessonId} from '../../hook/use-lesson-id';

type Template = {
	head?: string;
	body?: string;
	tail?: string;
};

export default function CreateTemplateBtn() {
	const lessonId = useLessonId();
	const {data} = useGetLessonTemplate(lessonId);
	const currentTemplate = data?.template;
	const currentAnswer = data?.answer;
	const language = useAtomValue(languagesAtom);
	const code = useAtomValue(codeAtom);
	const {mutate: updateLesson, isPending} = useUpdateLesson();
	const [open, setOpen] = useState(false);
	const [templateData, setTemplateData] = useState<Template>({});
	const [answerData, setAnswerData] = useState('');
	useEffect(() => {
		setTemplateData(currentTemplate || {});
	}, [currentTemplate]);
	useEffect(() => {
		setAnswerData(currentAnswer || '');
	}, [currentAnswer]);
	const onSubmit = () => {
		updateLesson(
			{
				lessonId,
				template: templateData,
				answer: answerData,
			},
			{
				onSuccess: () => {
					toast.success('Template created successfully!');
				},
				onError: error => {
					toast.error(`Failed to create template`);
					console.error('⚙️ Error creating template:', error);
				},
			},
		);
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<ActionSelector title="Make template" disabled={isPending}>
						{isPending ? <Loader2 className="animate-spin" /> : <FileCode />}
					</ActionSelector>
				</DialogTrigger>
				<DialogContent className="flex h-[90vh] flex-col overflow-hidden sm:max-w-4xl">
					<DialogHeader>
						<DialogTitle>Create Code Template</DialogTitle>
						<DialogDescription>
							Create a structured code template with organized sections for imports,
							main code, and helper functions.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-3">
						<Label>Programming Language</Label>

						<div className="bg-muted rounded-md px-3 py-2 text-sm font-medium">
							{language?.name || 'Select a language'}
						</div>
					</div>
					<ScrollArea className="h-full pr-4">
						<Accordion type="multiple" className="w-full">
							<AccordionItem value="preview">
								<AccordionTrigger>Source Code</AccordionTrigger>
								<AccordionContent>
									<Textarea value={code || ''} readOnly />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="head">
								<AccordionTrigger>Head Section</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={templateData?.head || ''}
										onChange={value =>
											setTemplateData(draft => ({
												...draft,
												head: value.target.value || '',
											}))
										}
										placeholder="// Import necessary libraries"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="body">
								<AccordionTrigger>Body Section</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={templateData?.body || ''}
										onChange={value =>
											setTemplateData(draft => ({
												...draft,
												body: value.target.value || '',
											}))
										}
										placeholder="// Main user code area (e.g., function example() { })"
									/>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="answer">
								<AccordionTrigger
									className={cn(
										answerData ? 'text-darkOceanBlue' : 'text-darkSunsetCoral',
									)}>
									Answer Section
								</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={answerData || ''}
										onChange={e => setAnswerData(e.target.value || '')}
										placeholder={`Answer code for ${language?.name} here...`}
									/>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="tail">
								<AccordionTrigger>Tail Section</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={templateData?.tail || ''}
										onChange={value =>
											setTemplateData(draft => ({
												...draft,
												tail: value.target.value || '',
											}))
										}
										placeholder="// Helper functions and main execution"
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<DialogFooter className="mt-4 gap-2">
							<Button type="button" variant="outline" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type="button" onClick={onSubmit} disabled={isPending}>
								{isPending ? <Loader2 className="animate-spin" /> : null}
								Create
							</Button>
						</DialogFooter>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	);
}
