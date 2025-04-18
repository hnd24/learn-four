import {parseAsBoolean, useQueryStates} from "nuqs";

export const useTableProblem = () => {
	const [config, setConfig] = useQueryStates({
		stateColumn: parseAsBoolean.withDefault(true),
		levelColumn: parseAsBoolean.withDefault(true),
		nameColumn: parseAsBoolean.withDefault(true),
		topicColumn: parseAsBoolean.withDefault(true),
		starColumn: parseAsBoolean.withDefault(true),
	});
	return {
		config,
		setConfig,
	};
};
