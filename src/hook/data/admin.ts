import {ITEM_PER_PAGE} from '@/constants';
import {ROLE_USER} from '@/types';
import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {usePaginatedQuery} from 'convex/react';
import {useEffect} from 'react';
import {api} from '../../../convex/_generated/api';
import {useFilterUser} from '../search/use-filter-user';

export const useCheckAdmin = () => {
	return useQuery(convexQuery(api.admin.confirmAdmin, {}));
};

export const useCheckSuperAdmin = () => {
	return useQuery(convexQuery(api.admin.confirmSuperAdmin, {}));
};

export const useChangeRole = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.admin.changeRole),
	});
};

export const useLockUser = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.admin.lockUser),
	});
};

export const useUnLockUser = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.admin.unlockUser),
	});
};

export const useGetAdmins = () => {
	return useQuery(convexQuery(api.admin.getAdmins, {}));
};

type STATE_LOCKED = 'locked' | 'unlocked';

export const useQueryUser = () => {
	const {
		filter: {name, role, locked},
	} = useFilterUser();
	const params = {
		...{name: name.trim() === '' ? undefined : name.trim()},
		...{role: role === 'all' ? undefined : (role as ROLE_USER)},
		...{locked: locked === 'all' ? undefined : (locked as STATE_LOCKED)},
	};
	const {results, isLoading, loadMore, status} = usePaginatedQuery(api.admin.queryUsers, params, {
		initialNumItems: ITEM_PER_PAGE,
	});

	useEffect(() => {
		if (isLoading) return;

		if (results.length < ITEM_PER_PAGE && status === 'CanLoadMore') {
			loadMore(ITEM_PER_PAGE - results.length);
		}
	}, [isLoading, results.length, status, loadMore]);

	return {results, isLoading, loadMore, status};
};
