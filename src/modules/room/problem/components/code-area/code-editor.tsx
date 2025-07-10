'use client';

import {useMounted} from '@/hook/use-mounted';
import {Editor, OnMount} from '@monaco-editor/react';
import {useAtom, useAtomValue} from 'jotai';
import {AlignLeft, Loader2} from 'lucide-react';
import {editor} from 'monaco-editor';
import {useRef} from 'react';
import {ActionSelector} from '../../../../../components/action-selector';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import CreateTemplateBtn from './create-template-btn';
import LanguageSelector from './language-selector';
import {ResetCodeButton} from './reset-code';
import RunCodeBtn from './run-code-btn';

type Props = {
	isPrivate: boolean;
};

export const CodeEditor = ({isPrivate}: Props) => {
	const mounted = useMounted();
	const language = useAtomValue(languagesAtom);
	const [code, setCode] = useAtom(codeAtom);
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
	if (!mounted) {
		return (
			<div className="bg-border flex size-full items-center justify-center rounded-b-md border border-t-0">
				<Loader2 className="text-muted-foreground size-6 animate-spin" />
			</div>
		);
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
					<CreateTemplateBtn />
				</div>
			</div>
			<div className="h-full overflow-hidden">
				<Editor
					height="100%"
					onMount={onMount}
					language={language?.value}
					value={code[language?.value || 'javascript'] || ''}
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
