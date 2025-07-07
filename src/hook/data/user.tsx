import {useCallback, useState} from 'react';

export const useCheckAdmin = () => {
	const [loading, setLoading] = useState(false);

	const checkAdmin = useCallback(async (userId: string): Promise<boolean> => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return true;
	}, []);

	return {checkAdmin, loading};
};
