import {ProblemStateType} from "@/types";
import {useCallback, useState} from "react";
import {problemData} from ".";

export const useGetProblems = () => {
	const [loading, setLoading] = useState(false);

	const getProblems = useCallback(
		async (
			topic?: string,
			level?: number,
			star?: number,
			name?: string,
		): Promise<ProblemStateType[]> => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
			return problemData;
		},
		[],
	);

	return {getProblems, loading};
};
