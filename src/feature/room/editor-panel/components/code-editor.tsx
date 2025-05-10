"use client";

import {Editor} from "@monaco-editor/react";

import {setDraftCode} from "@/lib/utils";

import {useClerk} from "@clerk/nextjs";

import {LanguageProgramming} from "@/constants";
import {CodeEditorSkeleton} from "./code-editor-skeleton";

type Props = {
	theme: string;
	language: LanguageProgramming;
	textSize?: number;
	value?: string;
	onChange?: (value?: string) => void;
	readonly?: boolean;
};
type OpaqueRoom = any;
export const CodeEditor = ({
	theme = "vs-dark",
	readonly = false,
	language,
	value,
	textSize,
	onChange,
}: Props) => {
	// Monaco Editor causes ClerkJS to fail loading
	// https://github.com/clerk/javascript/issues/1643

	const clerk = useClerk();
	if (!clerk.loaded) {
		return null;
	}

	const handleChange = (value?: string) => {
		if (!onChange) return;

		onChange(value);
		setDraftCode({language, code: value});
	};

	return (
		<>
			<Editor
				language={language}
				theme={theme}
				value={value}
				onChange={handleChange}
				options={{
					readOnly: readonly,
					fontSize: textSize,
					automaticLayout: true,
					scrollBeyondLastLine: false,
					padding: {top: 24, bottom: 16},
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
		</>
	);
};
