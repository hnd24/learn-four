import {v} from 'convex/values';
import stc from 'string-to-color';
import {mutation, query} from './_generated/server';
import {RoleType} from './schema';
export const confirmAdmin = query({
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return false;
		}

		const admin = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', identity.subject))
			.unique();
		if (admin && (admin.role === 'admin' || admin.role === 'super_admin')) {
			return true;
		}
		return false;
	},
});

export const changeRole = mutation({
	args: {userId: v.string(), role: RoleType},
	async handler(ctx, {userId, role}) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}
		const yourRole = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', identity.subject))
			.unique();
		if (yourRole?.role !== 'super_admin') {
			throw new Error('Only super admins can change roles');
		}
		const userRole = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', userId))
			.unique();
		if (userRole) {
			if (userRole?.role === role) {
				throw new Error(`User is already an ${role}`);
			}
			await ctx.db.patch(userRole._id, {
				role,
			});
		} else {
			await ctx.db.insert('roles', {
				userId,
				role,
			});
		}
	},
});

export const lockUser = mutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const yourRole = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', identity.subject))
			.unique();

		const user = await ctx.db
			.query('users')
			.withIndex('by_userId', q => q.eq('userId', args.userId))
			.unique();
		if (!user) {
			throw new Error('User not found');
		}
		if (user?.locked) {
			throw new Error('User is already locked');
		}
		const userRole = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', args.userId))
			.unique();
		if (userRole?.role === 'super_admin') {
			throw new Error('Cannot lock a super admin');
		}
		if (yourRole?.role === 'admin' && userRole?.role === 'admin') {
			throw new Error('User is admin');
		}

		if (user) {
			await ctx.db.patch(user._id, {
				locked: true,
			});
		}
	},
});

export const getAdmins = query({
	async handler(ctx) {
		const rawAdmins = await ctx.db.query('roles').collect();
		const admins = await Promise.all(
			rawAdmins.map(async admin => {
				const color = stc(`light-${admin.userId}`);
				const user = await ctx.db
					.query('users')
					.withIndex('by_userId', q => q.eq('userId', admin.userId))
					.unique();
				if (user?.locked) return;
				return {
					id: admin.userId,
					name: user?.name || 'Unknown',
					color,
					avatar: user?.image || '/images/default-avatar.svg',
				};
			}),
		);
		return admins;
	},
});
