import { db } from '$lib/server/db';
import { allLevels, userLevels } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const { levelId, levelNumber } = data;
		if (!levelId || isNaN(Number(levelNumber))) {
			return json({ success: false, error: 'Invalid parameters' }, { status: 400 });
		}
		const [levelFiles] = await db
			.select({ files: allLevels.files })
			.from(allLevels)
			.where(eq(allLevels.id, Number(levelNumber)));
		const [userLevel] = await db
			.update(userLevels)
			.set({ files: levelFiles.files, status: 'Not Attempted' })
			.where(eq(userLevels.id, levelId))
			.returning();
		return json({ success: true, userfiles: userLevel.files });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}
