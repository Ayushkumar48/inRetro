import { error } from '@sveltejs/kit';
import Level from '../../../lib/models/Level.js';

export async function load({ params }) {
	const { level } = params;
	const queryResult = await Level.query('level').eq(Number(level)).exec();
	const res = queryResult.toJSON()[0];
	if (!res) {
		error(404, 'Enter a valid level!!!');
	} else {
		return { res, level };
	}
}
