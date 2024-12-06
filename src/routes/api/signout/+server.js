import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	cookies.delete('username', { path: '/' });
	return json(208, { success: true });
}
