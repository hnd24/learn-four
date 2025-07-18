import {Id} from '../../convex/_generated/dataModel';

export type ROLE_USER = 'admin' | 'super_admin' | 'user';

export type LinkType = {
	Facebook: string;
	LinkedIn: string;
	GitHub: string;
	Youtube: string;
	Phone: string;
};

export type UserStateType = {
	_id: Id<'users'>;
	_creationTime?: number;
	userId: string;
	name: string;
	email: string;
	image?: string;
	links?: Partial<LinkType>;
	introduce?: string;
	locked?: boolean;
	role?: ROLE_USER;
};

export type UserType = {
	id: string;
	name: string;
	avatar: string;
	color: string;
};
