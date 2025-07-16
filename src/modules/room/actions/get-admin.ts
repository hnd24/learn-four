'use server';

import {convex} from '@/lib/convex';
import {UserType} from '@/types';
import {api} from '../../../../convex/_generated/api';

export async function getAdmins() {
	const admin = await convex.query(api.admin.getAdmins, {});

	const result = admin.reduce((acc, user) => {
		if (user) {
			acc.set(user.id, {
				id: user.id,
				name: user.name,
				avatar: user.avatar,
				color: user.color,
			});
		}
		return acc;
	}, new Map<string, UserType>());

	return result;
}
