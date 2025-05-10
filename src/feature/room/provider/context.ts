// context.ts
import {LanguageProgramming, Theme} from "@/constants";
import {createContext} from "react";

export interface RoomContextProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	code: string;
	setCode: (code: string) => void;
	language: LanguageProgramming;
	setLanguage: (language: LanguageProgramming) => void;
	readonly: boolean;
	setReadonly: (readonly: boolean) => void;
}

export const Context = createContext<RoomContextProps | null>(null);
