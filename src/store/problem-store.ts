import {ProblemState} from "@/types";
import {createStore} from "zustand";

export type ProblemActions = {
	addProblemState: (problemState: (Partial<ProblemState> & {_id: string})[]) => void;
	changeProblemState: (problemState: Partial<ProblemState> & {_id: string}[]) => void;
};
export type ProblemStore = {
	problems: (Partial<ProblemState> & {_id: string})[];
} & ProblemActions;

export const createProblemStore = (initState: (Partial<ProblemState> & {_id: string})[]) => {
	return createStore<ProblemStore>()(set => ({
		problems: initState,
		addProblemState: problemState =>
			set(state => ({
				problems: [...state.problems, ...problemState],
			})),
		changeProblemState: problemState =>
			set(() => ({
				problems: [...problemState],
			})),
	}));
};
