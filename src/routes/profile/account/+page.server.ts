import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { accountFormSchema } from '$lib/client/schema.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(accountFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(accountFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};
