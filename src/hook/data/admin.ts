import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../../../convex/_generated/api';

export const useCheckAdmin = () => {
	return useQuery(convexQuery(api.admin.confirmAdmin, {}));
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

export const useGetAdmins = () => {
	return useQuery(convexQuery(api.admin.getAdmins, {}));
};
