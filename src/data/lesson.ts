import {ProblemStateType} from "@/types";
import {problemData} from ".";

export const useGetLessons = () => {
	const data: ProblemStateType[] = problemData;
	const getLessons = () => {
		return data;
	};
	const loading = false;
	return {getLessons, loading};
};
