import { db } from '$lib/server/db';
import { userLevels, userLevelsScore } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rawData = await db
		.select({
			levelDetails: userLevels.levelDetails,
			template: userLevels.template,
			id: userLevels.id,
			status: userLevels.status,
			levelId: userLevels.levelId,
			userId: userLevels.userId,
			scores: userLevelsScore.scores
		})
		.from(userLevels)
		.leftJoin(userLevelsScore, eq(userLevels.userId, userLevelsScore.userId))
		.where(eq(userLevels.status, 'Submitted for Evaluation'));

	const checkingLevels = rawData.map((row) => {
		const matchingScore = row.scores?.find((score) => score.levelNumber === row.levelId);
		return {
			levelDetails: row.levelDetails,
			template: row.template,
			id: row.id,
			status: row.status,
			levelId: row.levelId,
			score: matchingScore ?? null
		};
	});
	return {
		checkingLevels
	};
};
