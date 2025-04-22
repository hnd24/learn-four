"use client";
import {createUserStore, UserStore} from "@/store/user-store";
import {createContext, ReactNode, useContext, useRef} from "react";
import {useStore} from "zustand";

export type UserStoreApi = ReturnType<typeof createUserStore>;
export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export type Props = {
	children: ReactNode;
};

export const UserStoreProvider = ({children}: Props) => {
	const storeRef = useRef<UserStoreApi | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createUserStore({});
	}

	return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
	const UserStore = useContext(UserStoreContext);

	if (!UserStore) {
		throw new Error(`useUserStore must be used within UserStoreProvider`);
	}

	return useStore(UserStore, selector);
};
