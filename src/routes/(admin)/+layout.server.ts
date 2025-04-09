import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.admin && locals.adminSession) {
		return { admin: locals.admin };
	}
	return { admin: null };
};
