import {parseAsString, useQueryStates} from 'nuqs';

export const useStatusFilter = () => {
	const [status, setStatus] = useQueryStates({
		type: parseAsString.withDefault('all'),
	});

	return {status, setStatus};
};
