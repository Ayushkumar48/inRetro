import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const levelId = data.levelId;
		const [existingRecord] = await db
			.select({ status: userLevels.status })
			.from(userLevels)
			.where(eq(userLevels.id, levelId));

		if (existingRecord.status === 'Submitted for Evaluation') {
			return json('Code already submitted for evaluation.');
		}

		if (existingRecord.status === 'Completed') {
			return json('Code already completed.');
		}
		await db
			.update(userLevels)
			.set({ status: 'Submitted for Evaluation' })
			.where(eq(userLevels.id, levelId));
		return json('Code submitted for evaluation.');
	} catch (error) {
		console.error('Error parsing request:', error);
		return json('Invalid JSON', { status: 400 });
	}
}
