"use client";

import {LanguageProgramming, Theme} from "@/constants";

import {ReactNode, useState} from "react";
import {Context} from "./context";

export default function DashboardProvider({children}: {children: ReactNode}) {
	const [theme, setTheme] = useState<Theme>(Theme.Light);
	const [code, setCode] = useState<string>("");
	const [language, setLanguage] = useState<LanguageProgramming>(LanguageProgramming.JavaScript);
	const [readonly, setReadonly] = useState<boolean>(false);

	return (
		<Context.Provider
			value={{theme, setTheme, code, setCode, language, setLanguage, readonly, setReadonly}}>
			{children}
		</Context.Provider>
	);
}
