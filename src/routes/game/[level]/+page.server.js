import { error, redirect } from '@sveltejs/kit';
import Level from '../../../lib/models/Level.js';

export async function load({ params, cookies }) {
	const username = cookies.get('username');
	if (!username || username === '') {
		redirect(307, '/auth');
	}
	const { level } = params;
	const queryResult = await Level.query('level').eq(Number(level)).exec();
	const res = queryResult.toJSON()[0];
	if (!res) {
		error(404, 'Enter a valid level!!!');
	} else {
		return { res, level };
	}
}
