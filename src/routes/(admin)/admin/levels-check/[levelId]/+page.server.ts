import { db } from '$lib/server/db/index.js';
import { userLevels } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const levelId = params.levelId;
	const [level] = await db
		.select({
			files: userLevels.files,
			levelDetails: userLevels.levelDetails,
			startScript: userLevels.startScript,
			template: userLevels.template,
			levelId: userLevels.levelId,
			userId: userLevels.userId
		})
		.from(userLevels)
		.where(eq(userLevels.id, levelId));
	return {
		level
	};
}
