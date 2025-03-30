import { db } from '$lib/server/db';
import { allLevels, userLevels } from '$lib/server/db/schema';
import { and, count, eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	// @ts-expect-error Linter is just giving warning about this but, it works.
	const gameId = params.gameId;
	const [gameCount] = await db
		.select({ count: count() })
		.from(userLevels)
		.where(and(eq(userLevels.levelId, gameId), eq(userLevels.userId, locals.user?.id ?? '')));
	if (gameCount.count === 0) {
		const [game] = await db.select().from(allLevels).where(eq(allLevels.id, gameId));
		return { game };
	}
	const [game] = await db
		.select()
		.from(userLevels)
		.where(and(eq(userLevels.levelId, gameId), eq(userLevels.userId, locals.user?.id ?? '')));
	return { game };
};
