import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';

export async function load({ locals }) {
	const userId = locals.user?.id;
	if (!userId) {
		redirect(302, '/login');
	}
	const favLevels = await db
		.select({
			id: userLevels.id,
			levelId: userLevels.levelId,
			levelDetails: userLevels.levelDetails,
			status: userLevels.status
		})
		.from(userLevels)
		.where(and(eq(userLevels.userId, userId), sql`level_details->>'isBookmarked' = 'true'`));
	return {
		favLevels
	};
}
