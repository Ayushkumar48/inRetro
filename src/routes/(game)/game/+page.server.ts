import { db } from '$lib/server/db';
import { redis } from '$lib/server/db/redis';
import { allLevels } from '$lib/server/db/schema';

export async function load() {
	try {
		const cached = await redis.get('all_levels');
		if (cached) {
			console.log('cache hit', cached);
			return { levels: JSON.parse(cached) };
		}
		console.log('cache miss');
		const levels = await db
			.select({ id: allLevels.id, levelDetails: allLevels.levelDetails })
			.from(allLevels);
		if (levels) {
			levels.sort((a, b) => a.id - b.id);
		}
		redis.set('all_levels', JSON.stringify(levels), 'EX', 60 * 60);
		return { levels };
	} catch (error) {
		console.log(error);
	}
}
