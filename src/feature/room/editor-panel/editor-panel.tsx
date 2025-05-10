"use client";
import {LanguageProgramming} from "@/constants";
import {useState} from "react";
import {useRoom} from "../provider";
import {CodeEditor} from "./components/code-editor";

export default function EditorPanel() {
	const [code, setCode] = useState<string | undefined>("");
	return (
		<div className="w-full h-full flex justify-center items-center">
			<CodeEditor onChange={setCode} theme="vs-dark" language={LanguageProgramming.JavaScript} />
		</div>
	);
}
