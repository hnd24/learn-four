"use client";

import {Editor} from "@monaco-editor/react";

import {setDraftCode} from "@/lib/utils";

import {useClerk} from "@clerk/nextjs";

import {useRoom} from "../../provider";
import {CodeEditorSkeleton} from "./code-editor-skeleton";

export const CodeEditor = () => {
	const {code, setCode, theme, language, loadingUserLesson: loading} = useRoom();
	// Monaco Editor causes ClerkJS to fail loading
	// https://github.com/clerk/javascript/issues/1643
	const clerk = useClerk();
	if (!clerk.loaded) {
		return null;
	}

	const handleChange = (value?: string) => {
		if (!setCode) return;

		setCode({...code, [language]: value || ""});
		setDraftCode({language, code: value});
	};

	return (
		<div className="flex w-full h-full">
			<Editor
				language={language}
				theme={theme}
				value={code[language]}
				onChange={handleChange}
				options={{
					// readOnly: readOnly,
					automaticLayout: true,
					scrollBeyondLastLine: false,
					padding: {top: 16, bottom: 16},
					fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
					fontLigatures: true,
					cursorBlinking: "smooth",
					smoothScrolling: true,
					renderLineHighlight: "none",
					lineHeight: 1.6,
					letterSpacing: 0.5,
					scrollbar: {
						verticalScrollbarSize: 8,
						horizontalScrollbarSize: 8,
					},
				}}
				loading={<CodeEditorSkeleton />}
			/>
		</div>
	);
};
