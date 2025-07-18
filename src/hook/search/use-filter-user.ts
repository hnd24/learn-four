import {parseAsString, useQueryStates} from 'nuqs';

export const useFilterUser = () => {
	const [filter, setFilter] = useQueryStates({
		name: parseAsString.withDefault(''),
		// "all" | "user" | "admin" | "super_admin"
		role: parseAsString.withDefault('all'),
		// "locked" | "unlocked" | "all"
		locked: parseAsString.withDefault('all'),
	});

	return {filter, setFilter};
};
