import Level from '$lib/models/Level.js';
import { fail, json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const newLevel = new Level(data);
		await newLevel.save();

		return json({ status: 201, message: 'Code saved successfully.' });
	} catch (err) {
		console.error(err);
		return fail(500, { message: 'Error occurred while saving code.' });
	}
}
