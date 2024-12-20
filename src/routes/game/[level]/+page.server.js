import { error, redirect } from '@sveltejs/kit';
import User from '$lib/models/User.js';
import Level from '$lib/models/Level.js';

export async function load({ params, cookies }) {
	const username = cookies.get('username');
	const levelId = Number(params.level);
	if (!username || username === '') {
		redirect(307, '/auth');
	}
	const queryResult = await User.query('username').eq(username).exec();
	const res = queryResult.toJSON()[0];
	let levelData;
	for (let i = 0; i < res.levels.length; i++) {
		if (res.levels[i].levelId === levelId) {
			levelData = res.levels[i];
			break;
		}
	}
	if (!levelData) {
		const query = await Level.query('levelId').eq(levelId).exec();
		const response = query.toJSON()[0];
		levelData = response;
	}
	if (!levelData) {
		error(404, { message: 'Enter a valid level.' });
	}
	return { level: levelData };
}
