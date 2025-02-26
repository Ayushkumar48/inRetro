import { db, redis } from '$lib/server/db';
import { allLevels } from '$lib/server/db/schema';
import { localLevels } from '$lib/stores/store.svelte';

export async function load() {
	try {
		if (localLevels.current) {
			return { levels: localLevels.current };
		}
		const redisCached = await redis.get('all_levels');
		if (redisCached) {
			localLevels.current = JSON.parse(redisCached);
			return { levels: JSON.parse(redisCached) };
		}
		const levels = await db
			.select({ id: allLevels.id, levelDetails: allLevels.levelDetails })
			.from(allLevels);
		if (levels) {
			levels.sort((a, b) => a.id - b.id);
		}
		localLevels.current = levels;
		redis.set('all_levels', JSON.stringify(levels), 'EX', 60 * 60);
		return { levels };
	} catch (error) {
		console.error(error);
	}
}
