import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const userId = data.userId;
		const levelId = data.levelId;
		const [existingRecord] = await db
			.select({ levelDetails: userLevels.levelDetails })
			.from(userLevels)
			.where(and(eq(userLevels.userId, userId), eq(userLevels.levelId, levelId)));

		if (!existingRecord) {
			return json({ success: false, error: 'Please save the code first.' }, { status: 404 });
		}

		if (existingRecord.levelDetails.status === 'Submitted for Evaluation') {
			return json({ success: false, message: 'Code already submitted for evaluation.' });
		}

		if (existingRecord.levelDetails.status === 'Completed') {
			return json({ success: false, message: 'Code already completed.' });
		}

		const updatedLevelDetails = {
			...existingRecord.levelDetails,
			status: 'Submitted for Evaluation' as const
		};
		await db
			.update(userLevels)
			.set({ levelDetails: updatedLevelDetails })
			.where(and(eq(userLevels.userId, userId), eq(userLevels.levelId, levelId)));
		return json({ success: true, message: 'Code submitted for evaluation.' });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}
