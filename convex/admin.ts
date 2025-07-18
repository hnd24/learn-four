import {filter} from 'convex-helpers/server/filter';
import {paginationOptsValidator} from 'convex/server';
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

export const confirmSuperAdmin = query({
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return false;
		}

		const admin = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', identity.subject))
			.unique();
		if (admin && admin.role === 'super_admin') {
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
			if (role === 'user') {
				await ctx.db.delete(userRole._id);
				return;
			}

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
		if (yourRole?.role !== 'super_admin') {
			throw new Error('Only super admins can lock users');
		}

		const isLocked = await ctx.db
			.query('locked_users')
			.withIndex('by_userId', q => q.eq('userId', args.userId))
			.unique();
		if (isLocked) {
			throw new Error('User is already locked');
		}
		const userRole = await ctx.db
			.query('roles')
			.withIndex('by_userId', q => q.eq('userId', args.userId))
			.unique();
		if (userRole?.role) {
			throw new Error(`Cannot lock a ${userRole.role}`);
		}
		await ctx.db.insert('locked_users', {
			userId: args.userId,
		});
	},
});

export const unlockUser = mutation({
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
		if (yourRole?.role !== 'super_admin') {
			throw new Error('Only super admins can unlock users');
		}

		const isLocked = await ctx.db
			.query('locked_users')
			.withIndex('by_userId', q => q.eq('userId', args.userId))
			.unique();
		if (!isLocked) {
			throw new Error('User is not locked');
		}
		await ctx.db.delete(isLocked._id);
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
				const isLocked = await ctx.db
					.query('locked_users')
					.withIndex('by_userId', q => q.eq('userId', admin.userId))
					.unique();
				if (isLocked) return;
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

export const queryUsers = query({
	args: {
		name: v.optional(v.string()),
		role: v.optional(RoleType),
		locked: v.optional(v.union(v.literal('locked'), v.literal('unlocked'))),
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, {name, paginationOpts, role, locked}) {
		const listAdminId = await ctx.db.query('roles').collect();
		const listLockedUsers = await ctx.db.query('locked_users').collect();
		const preIndexQuery = ctx.db.query('users');
		const baseQuery = name
			? preIndexQuery.withSearchIndex('by_name', q => q.search('name', name))
			: preIndexQuery;
		const filteredQuery = filter(baseQuery, user => {
			const roleUser =
				listAdminId.find(admin => admin.userId === user.userId)?.role || 'user';
			if (role && roleUser !== role) return false;
			if (locked) {
				const isLocked = listLockedUsers.find(
					lockedUser => lockedUser.userId === user.userId,
				);
				if (locked === 'locked' && !isLocked) return false;
				if (locked === 'unlocked' && isLocked) return false;
			}
			return true;
		});
		const rawResults = await filteredQuery.paginate(paginationOpts);
		return {
			...rawResults,
			page: rawResults.page.map(user => {
				const roleUser =
					listAdminId.find(admin => admin.userId === user.userId)?.role || 'user';
				const isLocked = listLockedUsers.find(
					lockedUser => lockedUser.userId === user.userId,
				);
				return {
					...user,
					locked: !!isLocked,
					role: roleUser,
				};
			}),
		};
	},
});
