'use client';

import LoadingState from '@/components/loading-state';
import {useMounted} from '@/hook/use-mounted';
import {cn} from '@/lib/utils';
import {Editor, OnMount} from '@monaco-editor/react';
import {useAtom, useAtomValue} from 'jotai';
import {AlignLeft} from 'lucide-react';
import {editor} from 'monaco-editor';
import {useRef} from 'react';
import {ActionSelector} from '../../../../../components/action-selector';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {statusProblemAtom} from '../../atom/status';
import CreateTemplateBtn from './create-template-btn';
import LanguageSelector from './language-selector';
import {ResetCodeButton} from './reset-code';
import RunCodeBtn from './run-code-btn';

export const CodeEditor = () => {
	const mounted = useMounted();
	const language = useAtomValue(languagesAtom);
	const [code, setCode] = useAtom(codeAtom);
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
	const status = useAtomValue(statusProblemAtom);
	if (!mounted) {
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

	if (!language?.value) {
		return null;
	}

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
					language={language?.value}
					value={code[language?.value || '']}
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
