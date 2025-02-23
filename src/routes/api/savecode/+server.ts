import { db } from '$lib/server/db/index.js';
import { allLevels } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		const data = await request.json();
		console.log(data);
		await db.insert(allLevels).values(data);
		return json({ success: true });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}
export async function PUT({ request }) {
	try {
		const data = await request.json();
		await db
			.update(allLevels)
			.set({ files: data.files })
			.where(eq(allLevels.id, Number(data.id)));
		return json({ success: true });
	} catch (error) {
		console.error('Error parsing request:', error);
		return json({ success: false, error: 'Invalid JSON' }, { status: 400 });
	}
}
