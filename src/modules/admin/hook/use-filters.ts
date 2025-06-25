import {parseAsString, useQueryStates} from 'nuqs';

export const useFilter = () => {
	const [filter, setFilter] = useQueryStates({
		status: parseAsString.withDefault('all'),
		name: parseAsString.withDefault(''),
		topic: parseAsString.withDefault('all'),
		level: parseAsString.withDefault('all'),
	});

	return {filter, setFilter};
};
