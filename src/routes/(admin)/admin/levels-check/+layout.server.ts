import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.admin || !locals.adminSession) {
		redirect(303, '/admin/login');
	}
	if (!locals.admin.isApproved) {
		error(403, 'You are not approved yet!');
	}
	return {
		admin: locals.admin
	};
}
