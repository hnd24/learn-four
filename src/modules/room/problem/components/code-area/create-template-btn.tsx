'use client';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useGetLanguages} from '@/hook/data/language';
import {useGetProblemTemplate, useUpdateProblem} from '@/hook/data/problem';
import {LanguageType} from '@/types';
import {useAtomValue} from 'jotai';
import {FileCode, Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {ActionSelector} from '../../../../../components/action-selector';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {useProblemId} from '../../hook/use-problem-id';

export default function CreateTemplateBtn() {
	const problemId = useProblemId();
	const {data} = useGetProblemTemplate(problemId);
	const currentTemplate = data?.template;
	const language = useAtomValue(languagesAtom);
	const code = useAtomValue(codeAtom);

	const {data: LANGUAGES, isPending: loading} = useGetLanguages();

	const {mutate: updateProblem, isPending} = useUpdateProblem();

	const [open, setOpen] = useState(false);
	const [selectLang, setSelectLang] = useState<LanguageType>();

	const [formData, setFormData] = useState<TemplateType>({});

	useEffect(() => {
		setSelectLang(language || LANGUAGES?.[0]);
	}, [language, LANGUAGES]);

	useEffect(() => {
		setFormData(currentTemplate || {});
	}, [currentTemplate]);
	const languages: LanguageType[] =
		(Object.keys(code)
			.map(lang => {
				if (code[lang].trim()) {
					return LANGUAGES?.find(l => l.value === lang);
				}
			})
			.filter(Boolean) as LanguageType[]) || [];

	const onChangeLang = (value: string) => {
		const selectedLanguage = languages.find(lang => lang.value === value);

		if (!selectedLanguage) {
			toast.error('Unsupported language selected.');
			return;
		}

		setSelectLang(selectedLanguage);
	};

	const onSubmit = () => {
		// IMPORTANT
		updateProblem(
			{
				problemId,
				template: formData,
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
		console.log('🚀 ~ CreateTemplate :', formData);
	};

	if (loading || !selectLang) {
		return (
			<ActionSelector title="Loading..." disabled={true}>
				<Loader2 className="animate-spin" />
			</ActionSelector>
		);
	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<ActionSelector title="Make template" disabled={false}>
						<FileCode />
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

						{languages.length ? (
							<Select
								defaultValue={language?.value || languages?.[0].value}
								onValueChange={onChangeLang}>
								<SelectTrigger className="w-full font-medium !h-8 rounded-sm border-none bg-muted  dark:bg-transparent">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{languages.map(lang => (
										<SelectItem key={lang.value} value={lang.value}>
											{lang.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							<div className="bg-muted rounded-md px-3 py-2 text-sm font-medium">
								No languages selected
							</div>
						)}
					</div>
					<ScrollArea className="h-full pr-4">
						<Accordion type="multiple" className="w-full">
							<AccordionItem value="preview">
								<AccordionTrigger>Source Code</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={code[language?.value || 'javascript']}
										readOnly
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="head">
								<AccordionTrigger>Head Section</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={formData[selectLang?.value]?.head || ''}
										onChange={value =>
											setFormData(draft => ({
												...draft,
												[selectLang.value]: {
													...draft[selectLang.value],
													head: value.target.value || '',
												},
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
										value={formData[selectLang.value]?.body || ''}
										onChange={value =>
											setFormData(draft => ({
												...draft,
												[selectLang.value]: {
													...draft[selectLang.value],
													body: value.target.value || '',
												},
											}))
										}
										placeholder="// Main user code area (e.g., function example() { })"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="tail">
								<AccordionTrigger>Tail Section</AccordionTrigger>
								<AccordionContent>
									<Textarea
										value={formData[selectLang.value]?.tail || ''}
										onChange={value =>
											setFormData(draft => ({
												...draft,
												[selectLang.value]: {
													...draft[selectLang.value],
													tail: value.target.value || '',
												},
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
