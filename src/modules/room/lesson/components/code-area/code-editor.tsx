'use client';

import {ActionSelector} from '@/components/action-selector';
import LoadingState from '@/components/loading-state';
import {useMounted} from '@/hook/use-mounted';
import {cn} from '@/lib/utils';
import {Editor, OnMount} from '@monaco-editor/react';
import {useAtom, useAtomValue} from 'jotai';
import {AlignLeft} from 'lucide-react';
import {editor} from 'monaco-editor';
import {useRef} from 'react';
import {codeAtom} from '../../atom/code';
import {languagesAtom} from '../../atom/language';
import {statusLessonAtom} from '../../atom/status';
import CreateTemplateBtn from './create-template-btn';
import {ResetCodeButton} from './reset-code-btn';
import RunCodeBtn from './run-code-btn';
export default function CodeEditor() {
	const mounted = useMounted();
	const language = useAtomValue(languagesAtom);
	const [code, setCode] = useAtom(codeAtom);
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
	const status = useAtomValue(statusLessonAtom);
	if (!mounted) {
		return <LoadingState />;
	}

	const onMount: OnMount = editor => {
		editorRef.current = editor;
	};

	const onChange = (value?: string) => {
		setCode(value || '');
	};

	const onFormatCode = () => {
		if (editorRef.current) {
			editorRef.current.trigger('source', 'editor.action.formatDocument', {});
		}
	};
	return (
		<div className="bg-border flex h-full flex-col overflow-hidden rounded-b-md border">
			<div className="flex items-center justify-between p-1 pr-3">
				<div className="px-2 py-1 text-sm border shadow rounded-md ">
					<p>{language?.name}</p>
				</div>
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
					value={code || ''}
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
}
