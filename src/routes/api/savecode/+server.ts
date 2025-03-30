import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const [userLevel] = await db
			.insert(userLevels)
			.values({
				files: data.files,
				levelId: data.levelId,
				levelDetails: data.levelDetails,
				template: data.template,
				startScript: data.startScript,
				userId: data.userId
			})
			.returning();
		return json({ success: true, userLevel });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}

export async function PUT({ request }) {
	try {
		const data = await request.json();
		await db
			.update(userLevels)
			.set({ files: JSON.stringify(data.files) })
			.where(eq(userLevels.id, data.id));
		return json({ success: true });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}
