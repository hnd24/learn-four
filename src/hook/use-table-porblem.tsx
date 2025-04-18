import {parseAsBoolean, useQueryStates} from "nuqs";

export const useTableProblem = () => {
	const [config, setConfig] = useQueryStates({
		stateRow: parseAsBoolean.withDefault(true),
		levelRow: parseAsBoolean.withDefault(true),
		nameRow: parseAsBoolean.withDefault(true),
		topicRow: parseAsBoolean.withDefault(true),
		starRow: parseAsBoolean.withDefault(true),
	});
	return {
		config,
		setConfig,
	};
};
