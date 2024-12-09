import User from '$lib/models/User.js';
import Level from '$lib/models/Level.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const username = cookies.get('username');
	if (!username) {
		redirect(307, '/auth');
	}
	const userResult = await User.query('username').eq(username).exec();
	let user = userResult.map((item) => item.toJSON())[0];
	const levelsResult = await Level.scan().exec();
	const levels = levelsResult.map((item) => item.toJSON());
	user = { user: user.username, levels: user.levels };
	return { username, user, levels };
}
