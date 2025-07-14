import {parseAsBoolean, useQueryState} from 'nuqs';

export const useSearch = () => {
	const [search, setSearch] = useQueryState('search', parseAsBoolean.withDefault(false));

	return {search, setSearch};
};
