"use client";

import {LanguageProgramming} from "@/constants";
import {Theme} from "@/types";
import {ReactNode, useState} from "react";
import {Context} from "./context";

export default function DashboardProvider({children}: {children: ReactNode}) {
	const [theme, setTheme] = useState<Theme>("light");
	const [code, setCode] = useState<string>("");
	const [language, setLanguage] = useState<LanguageProgramming>(LanguageProgramming.JavaScript);

	return (
		<Context.Provider value={{theme, setTheme, code, setCode, language, setLanguage}}>
			{children}
		</Context.Provider>
	);
}
