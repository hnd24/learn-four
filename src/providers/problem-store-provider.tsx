"use client";
import {createProblemStore, ProblemStore} from "@/store/problem-store";
import {createContext, ReactNode, useContext, useRef} from "react";
import {useStore} from "zustand";

export type ProblemStoreApi = ReturnType<typeof createProblemStore>;
export const ProblemStoreContext = createContext<ProblemStoreApi | undefined>(undefined);

export type Props = {
	children: ReactNode;
};

export const ProblemStoreProvider = ({children}: Props) => {
	const storeRef = useRef<ProblemStoreApi | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createProblemStore([]);
	}

	return (
		<ProblemStoreContext.Provider value={storeRef.current}>{children}</ProblemStoreContext.Provider>
	);
};

export const useProblemStore = <T,>(selector: (store: ProblemStore) => T): T => {
	const problemStore = useContext(ProblemStoreContext);

	if (!problemStore) {
		throw new Error(`useProblemStore must be used within ProblemStoreProvider`);
	}

	return useStore(problemStore, selector);
};
