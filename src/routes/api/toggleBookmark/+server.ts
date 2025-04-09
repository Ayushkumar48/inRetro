import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const { levelId } = data;
		const [userLevelDetails] = await db
			.select({ levelDetails: userLevels.levelDetails })
			.from(userLevels)
			.where(eq(userLevels.id, levelId));
		await db
			.update(userLevels)
			.set({
				levelDetails: {
					...userLevelDetails.levelDetails,
					isBookmarked: !userLevelDetails.levelDetails.isBookmarked
				}
			})
			.where(eq(userLevels.id, levelId));

		return json({ success: true });
	} catch (error) {
		console.error('Error toggling bookmark:', error);
		return json({ success: false, error: 'Failed to toggle bookmark' });
	}
}
