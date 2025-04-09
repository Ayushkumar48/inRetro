import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const [existingLevel] = await db
			.select({ status: userLevels.status })
			.from(userLevels)
			.where(eq(userLevels.id, data.id));
		await db
			.update(userLevels)
			.set({
				files: data.files,
				status:
					existingLevel.status === 'Submitted for Evaluation'
						? 'Submitted for Evaluation'
						: 'Attempted'
			})
			.where(eq(userLevels.id, data.id));
		return json({ success: true });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid Request' }, { status: 400 });
	}
}
