import { db } from '$lib/server/db';
import { allLevels } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
	// @ts-expect-error Linter is just giving warning about this but, it works.
	const gameId = params.gameId;
	const [game] = await db.select().from(allLevels).where(eq(allLevels.id, gameId));
	return { game };
};
