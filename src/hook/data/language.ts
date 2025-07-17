import {convexQuery, useConvexMutation} from '@convex-dev/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../../../convex/_generated/api';

export const useGetLanguages = () => {
	return useQuery(convexQuery(api.languages.getLanguages, {}));
};

export const useAddLanguage = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.languages.createLanguage),
	});
};

export const useUpdateLanguage = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.languages.updateLanguage),
	});
};

export const useDeleteLanguage = () => {
	return useMutation({
		mutationFn: useConvexMutation(api.languages.deleteLanguage),
	});
};
