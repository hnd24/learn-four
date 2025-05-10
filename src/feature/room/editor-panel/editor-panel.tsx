"use client";
import {SquareCheck} from "lucide-react";
import {CodeEditor} from "./components/code-editor";

export default function EditorPanel() {
	return (
		<>
			<div className="flex items-center gap-1 px-4 py-2 border-b border-b-charcoal bg-zinc-100">
				<SquareCheck className="w-5 h-5 text-zinc-600 " />
				<span className="text-sm font-medium text-zinc-800 ">Testcase</span>
			</div>
			<CodeEditor />
		</>
	);
}
