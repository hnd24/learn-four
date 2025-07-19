import {Id} from '../../convex/_generated/dataModel';
import {UserType} from './user';

export type CommentType = {
	_id: Id<'comments'>;
	_creationTime: number;
	likes?: number | undefined;
	dislikes?: number | undefined;
	parent?: string | undefined;
	user: UserType | null;
	content: string;
	placeId: string;
	reply: boolean;
};
