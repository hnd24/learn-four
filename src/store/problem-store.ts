import {ProblemColumnTableType, ProblemStateType} from "@/types";
import {createStore} from "zustand";

export type ProblemActions = {
	addProblemState: (problemState: Partial<ProblemStateType>[]) => void;
	changeProblemState: (problemState: Partial<ProblemStateType>[], loading: boolean) => void;
	changeProblemColumnTableConfig: (config: Partial<ProblemColumnTableType>) => void;
};
export type ProblemStore = {
	problems: Partial<ProblemStateType>[];
	columnTableConfig: Partial<ProblemColumnTableType>;
	loading: boolean;
} & ProblemActions;

export const createProblemStore = (initState: Partial<ProblemStateType>[]) => {
	return createStore<ProblemStore>()(set => ({
		problems: initState,
		loading: false,
		columnTableConfig: {
			stateColumn: true,
			levelColumn: true,
			nameColumn: true,
			topicColumn: true,
			starColumn: true,
		},
		addProblemState: problemState =>
			set(state => ({
				problems: [...state.problems, ...problemState],
			})),
		changeProblemState: (problemState, loading) =>
			set(() => ({
				problems: [...problemState],
				loading: loading,
			})),
		changeProblemColumnTableConfig: config =>
			set(state => ({
				columnTableConfig: {
					...state.columnTableConfig,
					...config,
				},
			})),
	}));
};
