import { db } from '$lib/server/db';
import { allLevels, userLevels } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
	try {
		const levelId = Number(url.searchParams.get('levelId'));
		const id = url.searchParams.get('id');
		const [level] = await db.select().from(allLevels).where(eq(allLevels.id, levelId));
		const [userLevel] = await db
			.update(userLevels)
			.set({ files: JSON.stringify(level.files) })
			.where(eq(userLevels.id, id as string))
			.returning();
		return json({ success: true, userLevel });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}
