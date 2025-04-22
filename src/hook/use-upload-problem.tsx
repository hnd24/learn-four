import {Level, StarProblem, StateProblem, TopicProblem} from "@/constants";
import {parseAsString, useQueryStates} from "nuqs";

export const useUploadProblem = () => {
	const [config, setConfig] = useQueryStates({
		level: parseAsString.withDefault(Level.All.value + ""),
		star: parseAsString.withDefault(StarProblem.FiveStar.value),
		state: parseAsString.withDefault(StateProblem.All.value),
		name: parseAsString.withDefault(""),
		topic: parseAsString.withDefault(TopicProblem.Sorting.value),
	});

	return {
		config,
		setConfig,
	};
};
