import { db } from '$lib/server/db';
import { userLevels } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
	const levelId = params.gameId;
	if (!levelId) {
		throw new Error('Level ID is required');
	}
	const [level] = await db.select().from(userLevels).where(eq(userLevels.id, levelId));
	return { game: level };
};
