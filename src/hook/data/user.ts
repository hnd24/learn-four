import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../../../convex/_generated/api';

export const useCheckLocked = () => {
	return useQuery(convexQuery(api.users.checkLockedUser, {}));
};

export const useGetMe = () => {
	return useQuery(convexQuery(api.users.getMe, {}));
};

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.users.updateUserProfile),
	});
};
