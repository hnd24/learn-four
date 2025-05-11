"use client";
import {LanguageProgramming, Theme} from "@/constants";
import {SquareDashedBottomCode} from "lucide-react";
import {useState} from "react";
import {CodeEditor} from "./components/code-editor";

export default function EditorPanel() {
	const [theme, setTheme] = useState<Theme>(Theme.Light);
	const [code, setCode] = useState<string>("");
	const [language, setLanguage] = useState<LanguageProgramming>(LanguageProgramming.JavaScript);
	const [readonly, setReadonly] = useState<boolean>(false);
	return (
		<>
			<div className="flex items-center gap-1 px-4 py-2 border-b border-b-charcoal bg-zinc-200">
				<SquareDashedBottomCode className="w-5 h-5 text-leafyGreen" />
				<span className="text-sm font-medium text-zinc-800 ">Testcase</span>
			</div>
			<CodeEditor
				theme={theme}
				language={language}
				setCode={setCode}
				code={code}
				readonly={readonly}
			/>
		</>
	);
}
