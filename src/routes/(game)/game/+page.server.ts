import { db } from '$lib/server/db';
import { allLevels } from '$lib/server/db/schema';

export async function load() {
	try {
		const levels = await db
			.select({ id: allLevels.id, levelDetails: allLevels.levelDetails })
			.from(allLevels);
		if (levels) {
			levels.sort((a, b) => a.id - b.id);
		}
		return { levels };
	} catch (error) {
		console.log(error);
	}
}
