import {ProblemStateType} from "@/types";
import {createStore} from "zustand";

export type ProblemActions = {
	addProblemState: (problemState: Partial<ProblemStateType>[]) => void;
	changeProblemState: (problemState: Partial<ProblemStateType>[], loading: boolean) => void;
};
export type ProblemStore = {
	problems: Partial<ProblemStateType>[];
	loading: boolean;
} & ProblemActions;

export const createProblemStore = (initState: Partial<ProblemStateType>[]) => {
	return createStore<ProblemStore>()(set => ({
		problems: initState,
		loading: false,
		addProblemState: problemState =>
			set(state => ({
				problems: [...state.problems, ...problemState],
			})),
		changeProblemState: (problemState, loading) =>
			set(() => ({
				problems: [...problemState],
				loading: loading,
			})),
	}));
};
