import Contact from '$lib/models/Contact.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const name = data.get('name');
			const email = data.get('email');
			const message = data.get('message');
			const dt = String(new Date());
			const contact = new Contact({
				name,
				email,
				message,
				dt
			});
			await contact.save();
			return { message: 'Feedback sent.', success: true };
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Internal error occured!', success: false });
		}
	}
};
