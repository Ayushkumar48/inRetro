import User from '$lib/models/User';
import { json, fail } from '@sveltejs/kit';

export async function POST({ url, request }) {
	try {
		const username = url.searchParams.get('username');
		const data = await request.json();

		// Fetch user data
		const userDataResult = await User.query('username').eq(username).exec();
		const userData = userDataResult[0];

		if (!userData) {
			return fail(404, { message: 'User not found.' });
		}

		// Check if the level already exists
		let levelExists = false;
		for (let i = 0; i < userData.levels.length; i++) {
			if (userData.levels[i].levelId === data.levelId) {
				// Update existing level
				userData.levels[i] = data;
				levelExists = true;
				break;
			}
		}

		// Add a new level if it doesn't exist
		if (!levelExists) {
			userData.levels.push(data);
		}

		// Save the updated user data
		await userData.save();

		return json({ status: 201, message: 'Code saved successfully.' });
	} catch (err) {
		console.error(err);
		return fail(500, { message: 'Error occurred while saving the code.' });
	}
}
