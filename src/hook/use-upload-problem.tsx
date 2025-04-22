import {Level, StarProblem, StateProblem, TopicProblem} from "@/constants";
import {parseAsBoolean, parseAsString, useQueryStates} from "nuqs";

export const useUploadProblem = () => {
	const [config, setConfig] = useQueryStates({
		level: parseAsString.withDefault(Level.All.value + ""),
		star: parseAsString.withDefault(StarProblem.FiveStar.value),
		state: parseAsString.withDefault(StateProblem.All.value),
		searchName: parseAsString.withDefault(""),
		topic: parseAsString.withDefault(TopicProblem.Sorting.value),

		loading: parseAsBoolean.withDefault(false),
		upload: parseAsBoolean.withDefault(false),
	});

	return {
		config,
		setConfig,
	};
};
