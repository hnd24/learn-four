import {UserStateType} from "@/types";
import {createStore} from "zustand";

export type UserActions = {
	changeUserState: (UserState: Partial<UserStateType>) => void;
};
export type UserStore = {
	user: Partial<UserStateType>;
} & UserActions;

export const createUserStore = (initState: Partial<UserStateType>) => {
	return createStore<UserStore>()(set => ({
		user: initState,
		changeUserState: UserState =>
			set(() => ({
				user: UserState,
			})),
	}));
};
