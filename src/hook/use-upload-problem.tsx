import {Level, StarProblem, TopicProblem} from "@/constants";
import {parseAsString, useQueryStates} from "nuqs";

export const useUploadProblem = () => {
	const [config, setConfig] = useQueryStates({
		level: parseAsString.withDefault(Level.All.value + ""),
		star: parseAsString.withDefault(StarProblem.FiveStar.value),
		// state: parseAsString.withDefault(StateProblem.All.value),
		name: parseAsString.withDefault(""),
		topic: parseAsString.withDefault(TopicProblem.Sorting),
	});

	return {
		config,
		setConfig,
	};
};
