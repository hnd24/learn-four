import {problemData} from ".";

export type ParamProblemType = {
	searchName: string;
	topic: string;
	level: string;
	star: string;
	state: string;
};

export const useGetProblems = () => {
	const data = problemData;
	const getProblems = ({searchName, topic, level, star, state}: Partial<ParamProblemType>) => {
		return data;
	};
	const loading = false;

	return {getProblems, loading};
};
