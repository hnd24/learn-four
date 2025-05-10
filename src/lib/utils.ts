import {DRAFT_CODE_KEY} from "@/constants";
import {DraftCode} from "@/types";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const setDraftCode = (draft: DraftCode) => {
	if (!draft.code) return;

	localStorage.setItem(DRAFT_CODE_KEY, JSON.stringify(draft));
};

export const getDraftCode = () => {
	const draft = localStorage.getItem(DRAFT_CODE_KEY);
	return draft ? (JSON.parse(draft) as DraftCode) : null;
};
