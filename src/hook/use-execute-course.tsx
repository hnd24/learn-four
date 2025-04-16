import {parseAsBoolean, useQueryStates} from "nuqs";

export const useExecuteCourse = () => {
	const [config, setConfig] = useQueryStates({
		loading: parseAsBoolean.withDefault(false),
	});

	return {
		config,
		setConfig,
	};
};
