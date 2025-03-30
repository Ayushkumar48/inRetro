import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.admin) {
		error(404, { message: 'Unauthorized' });
	}
	return {
		admin: locals.admin
	};
}
