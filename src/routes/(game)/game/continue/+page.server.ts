import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function load({ locals }) {
	const userId = locals.user?.id;
	if (!userId) {
		redirect(302, '/login');
	}
	const continueLevels = await db
		.select({
			id: userLevels.id,
			levelId: userLevels.levelId,
			levelDetails: userLevels.levelDetails,
			status: userLevels.status
		})
		.from(userLevels)
		.where(and(eq(userLevels.userId, userId), eq(userLevels.status, 'Attempted')));
	return {
		continueLevels
	};
}
