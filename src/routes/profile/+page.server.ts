import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, redirect } from '@sveltejs/kit';
import { profileFormSchema } from '$lib/client/schema.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(profileFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(profileFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		redirect(303, event.url.pathname);
	}
};
