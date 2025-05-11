import {UserStateType} from "@/types";
import {useCallback, useState} from "react";
import {userData} from ".";

export const useGetUser = () => {
	const [loading, setLoading] = useState(false);

	const getUser = useCallback(async (): Promise<Partial<UserStateType> | null> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		return userData;
	}, []);

	return {getUser, loading};
};
