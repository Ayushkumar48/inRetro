import { db } from '$lib/server/db';
import { userLevelsScore } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return {
			userScores: null
		};
	}
	const [uS] = await db
		.select()
		.from(userLevelsScore)
		.where(eq(userLevelsScore.userId, locals.user.id));
	if (!uS) {
		return {
			userScores: null
		};
	}
	const userScores = uS.scores?.sort(
		(a, b) => new Date(a.completedOn).getTime() - new Date(b.completedOn).getTime()
	);
	return {
		userScores: userScores || null
	};
};
