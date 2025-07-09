import {useParams} from 'next/navigation';
import {Id} from '../../../../../convex/_generated/dataModel';

export const useProblemId = () => {
	const {id} = useParams<{id: string}>();
	return id as Id<'problems'>;
};
