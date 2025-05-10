// context.ts
import {LanguageProgramming} from "@/constants";
import {Theme} from "@/types";
import {createContext} from "react";

export interface RoomContextProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	code: string;
	setCode: (code: string) => void;
	language: LanguageProgramming;
	setLanguage: (language: LanguageProgramming) => void;
}

export const Context = createContext<RoomContextProps | null>(null);
