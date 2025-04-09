import { db } from '$lib/server/db';
import { userLevels } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
	try {
		if (!locals.user) {
			return { levels: [] };
		}
		const levels = await db
			.select({
				id: userLevels.id,
				levelId: userLevels.levelId,
				levelDetails: userLevels.levelDetails,
				status: userLevels.status
			})
			.from(userLevels)
			.where(eq(userLevels.userId, locals.user.id))
			.orderBy(asc(userLevels.levelId));
		return { levels };
	} catch (error) {
		console.error(error);
	}
}
