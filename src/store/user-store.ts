import {UserStateType} from "@/types";
import {createStore} from "zustand";

export type UserActions = {
	changeUserState: ({
		user,
		isSignedIn,
	}: {
		user?: Partial<UserStateType>;
		isSignedIn?: boolean;
	}) => void;
};
export type UserStore = {
	user: Partial<UserStateType>;
	isSignedIn?: boolean;
} & UserActions;

export const createUserStore = (initState: Partial<UserStateType>) => {
	return createStore<UserStore>()(set => ({
		user: initState,
		isSignedIn: false,
		changeUserState: ({user, isSignedIn}) =>
			set(state => ({
				user: user ? {...state.user, ...user} : state.user,
				isSignedIn: isSignedIn ?? state.isSignedIn,
			})),
	}));
};
