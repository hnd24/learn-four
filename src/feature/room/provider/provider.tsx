"use client";

import {LanguageProgramming, Theme} from "@/constants";

import {ReactNode, useState} from "react";
import {Context} from "./context";
import {RunCode} from "@/types";

export default function DashboardProvider({children}: {children: ReactNode}) {
	const [runCode, setRunCode] = useState<RunCode>(RunCode.None);

	return <Context.Provider value={{runCode, setRunCode}}>{children}</Context.Provider>;
}
