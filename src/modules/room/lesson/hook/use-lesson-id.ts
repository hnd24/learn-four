import {useParams} from 'next/navigation';
import {Id} from '../../../../../convex/_generated/dataModel';

export const useLessonId = () => {
	const {id} = useParams<{id: string}>();
	return id as Id<'lessons'>;
};
