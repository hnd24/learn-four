import {UserStateType} from '@/types';
import {useCallback, useState} from 'react';
import {userData} from '../../data';

export const useGetUser = () => {
	const [loading, setLoading] = useState(false);

	const getUser = useCallback(async (idUser: string): Promise<Partial<UserStateType> | null> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return userData;
	}, []);

	return {getUser, loading};
};

export const useCheckAdmin = () => {
	const [loading, setLoading] = useState(false);

	const checkAdmin = useCallback(async (idUser: string): Promise<boolean | null> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return true;
	}, []);

	return {checkAdmin, loading};
};
