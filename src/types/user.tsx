export enum Role {
	SUPER_ADMIN = "super_admin",
	ADMIN = "admin",
	USER = "user",
}

export type UserStateType = {
	userId: string;
	name: string;
	email: string;
	image: string;
	link?: LinkType;
	introduction?: string;
	activities?: ActivityType[];
	locked?: boolean;
	role?: Role;
};

export type LinkType = {
	facebook?: string;
	linkedIn?: string;
	github?: string;
	youtube?: string;
	phone?: string;
};
export type ActivityType = {
	day: string;
	level: number;
};

export type UserLessonType = {
	_id: string;
	lessonId: string;
	userId: string;
	code: string;
	isCompleted: boolean;
};
