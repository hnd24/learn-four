import {Id} from '../../convex/_generated/dataModel';
import {UserStateType} from './user';

export type CommentType = {
	_id: Id<'comments'>;
	_creationTime: number;
	likes?: string[] | undefined;
	dislikes?: string[] | undefined;
	user: UserStateType | null;
	content: string;
	placeId: string;
	reply: boolean;
};
