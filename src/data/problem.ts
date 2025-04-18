import {problemData} from ".";

export type ParamProblemType = {
	searchName: string;
	topic: string;
	difficultyLevel: string;
	star: string;
	state: string;
};

export const useGetProblems = () => {
	const data = problemData;
	const getProblems = ({
		searchName,
		topic,
		difficultyLevel,
		star,
		state,
	}: Partial<ParamProblemType>) => {
		return data;
	};
	const loading = false;

	return {getProblems, loading};
};
