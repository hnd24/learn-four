"use client";

import {Editor} from "@monaco-editor/react";

import {setDraftCode} from "@/lib/utils";

import {useClerk, useUser} from "@clerk/nextjs";

import {useEffect, useState} from "react";
import {useRoom} from "../../provider";
import {CodeEditorSkeleton} from "./code-editor-skeleton";

export const CodeEditor = () => {
	const {isSignedIn} = useUser();
	const [readOnly, setReadOnly] = useState<boolean>(false);
	const {code, setCode, theme, language, loadingUserLesson: loading} = useRoom();
	// Monaco Editor causes ClerkJS to fail loading
	// https://github.com/clerk/javascript/issues/1643
	const clerk = useClerk();
	if (!clerk.loaded) {
		return null;
	}

	useEffect(() => {
		if (loading || !isSignedIn) {
			setReadOnly(true);
		}
	}, [isSignedIn, loading]);
	useEffect(() => {
		console.log("code", code);
	}, [code]);

	const handleChange = (value?: string) => {
		if (!setCode) return;

		setCode(value || "");
		setDraftCode({language, code: value});
	};

	return (
		<div className="flex w-full h-full">
			<Editor
				language={language}
				theme={theme}
				value={code}
				onChange={handleChange}
				options={{
					readOnly: readOnly,
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
