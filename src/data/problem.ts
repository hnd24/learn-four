import {ProblemStateType, StatusPlaceType} from "@/types";
import {problemData} from ".";

export const useGetProblems = () => {
	const data: ProblemStateType[] = problemData;
	const getProblems = (
		topic?: string,
		level?: number,
		star?: number,
		state?: StatusPlaceType,
		name?: string,
	) => {
		return data;
	};
	const loading = false;

	return {getProblems, loading};
};
