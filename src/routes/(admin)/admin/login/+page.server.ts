import { db } from '$lib/server/db/index.js';
import { admin } from '$lib/server/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as adminAuth from '$lib/server/adminAuth';

export async function load({ locals }) {
	if (locals.admin && locals.adminSession && locals.admin.isApproved) {
		redirect(302, '/admin/levels-check');
	}
	locals.admin = null;
	locals.adminSession = null;
}

export const actions = {
	signup: async (event) => {
		const formData = await event.request.formData();
		const name = ((formData.get('name') as string) || '').trim();
		const email = ((formData.get('email') as string) || '').trim();
		const password = ((formData.get('password') as string) || '').trim();
		if (email && password && name && email !== '' && password !== '' && name !== '') {
			try {
				const [existingAdmin] = await db.select().from(admin).where(eq(admin.email, email));
				if (existingAdmin) {
					return fail(400, { email, name, message: 'Email already exists!' });
				}
				if (password.trim().length < 8) {
					return fail(400, {
						email,
						name,
						message: 'Atleast 8 characters are required in password!'
					});
				}

				const [newAdmin] = await db
					.insert(admin)
					.values({
						name,
						email,
						password,
						isApproved: false
					})
					.returning();

				const sessionToken = adminAuth.generateSessionToken();
				const session = await adminAuth.createAdminSession(sessionToken, newAdmin.id);
				adminAuth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
				return { success: true, admin: newAdmin };
			} catch (error) {
				console.error(error);
				return fail(500, { email, name, message: 'An error has occurred!' });
			}
		} else {
			return fail(400, {
				email,
				name,
				message: 'Please enter a valid name, email and/or password.'
			});
		}
	}
};
