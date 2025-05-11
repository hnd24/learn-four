// context.ts
import {RunCode} from "@/types";
import {createContext} from "react";

export interface RoomContextProps {
	setRunCode: (runCode: RunCode) => void;
	runCode: RunCode;
}

export const Context = createContext<RoomContextProps | null>(null);
