import {UserStateType} from "@/types";
import {userData} from ".";

export const useGetUser = () => {
	const data: Partial<UserStateType> = userData;
	const loading = false;
	const getUser = () => {
		return data;
	};
	return {getUser, loading};
};
