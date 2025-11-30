'use client';

import LoadingState from '@/components/loading-state';
import {useGetLanguages} from '@/hook/data/language';
import {useMounted} from '@/hook/use-mounted';
import {cn} from '@/lib/utils';
import {LanguageType} from '@/types';
import {Editor, OnMount} from '@monaco-editor/react';
import {useAtom, useAtomValue} from 'jotai';
import {AlignLeft} from 'lucide-react';
import {editor} from 'monaco-editor';
import {useEffect, useRef, useState} from 'react';
import {ActionSelector} from '../../../../../components/action-selector';
import {answerAtom} from '../../atom/answer';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {statusProblemAtom} from '../../atom/status';
import CreateTemplateBtn from './create-template-btn';
import LanguageSelector from './language-selector';
import {ResetCodeButton} from './reset-code';
import RunCodeBtn from './run-code-btn';

export const CodeEditor = () => {
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | undefined>(undefined);
	const {data: LANGUAGES, isPending} = useGetLanguages();
	const answer = useAtomValue(answerAtom);
	const mounted = useMounted();
	const language = useAtomValue(languagesAtom);
	const [code, setCode] = useAtom(codeAtom);
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
	const status = useAtomValue(statusProblemAtom);
	const finalLanguage = selectedLanguage || language;

	useEffect(() => {
		if (status === 'private') {
			if (LANGUAGES && LANGUAGES.length > 0) {
				setSelectedLanguage(LANGUAGES[0]);
			} else {
				const filterLanguages = Object.keys(answer).map(l => {
					if (answer[l]) {
						return LANGUAGES?.find(lang => lang.value === l);
					}
				});
				setSelectedLanguage(filterLanguages?.[0]);
			}
		}
	}, [LANGUAGES]);

	if (!mounted || isPending || !LANGUAGES) {
		return <LoadingState />;
	}

	const onMount: OnMount = editor => {
		editorRef.current = editor;
	};

	const onChange = (value?: string) => {
		setCode(draft => {
			draft[language?.value || 'javascript'] = value || '';
		});
	};

	const onFormatCode = () => {
		if (editorRef.current) {
			editorRef.current.trigger('source', 'editor.action.formatDocument', {});
		}
	};

	return (
		<div className="bg-border flex h-full flex-col overflow-hidden rounded-b-md border">
			<div className="flex items-center justify-between p-1 pr-3">
				<LanguageSelector />
				<div className="flex items-center gap-2">
					<ActionSelector title="Format Code" onClick={onFormatCode}>
						<AlignLeft />
					</ActionSelector>
					<ResetCodeButton />
					<RunCodeBtn />
					<div className={cn('hidden', {'flex': status === 'private'})}>
						<CreateTemplateBtn />
					</div>
				</div>
			</div>
			<div className="h-full overflow-hidden">
				<Editor
					height="100%"
					onMount={onMount}
					language={finalLanguage?.value}
					value={code[finalLanguage?.value || '']}
					onChange={onChange}
					theme="vs-dark"
					options={{
						fontSize: 15,
						fontWeight: '400',
						automaticLayout: true,
						scrollBeyondLastLine: false,
						padding: {top: 20, bottom: 16},
						fontFamily: 'Fira Code',
						fontLigatures: true,
						cursorBlinking: 'smooth',
						smoothScrolling: true,
						lineHeight: 1.4,
						renderWhitespace: 'none',
						minimap: {enabled: false},
						contextmenu: false,
						scrollbar: {
							verticalScrollbarSize: 8,
							horizontalScrollbarSize: 8,
						},
						stickyScroll: {
							enabled: false,
						},
						wordWrap: 'on',
					}}
				/>
			</div>
		</div>
	);
};
