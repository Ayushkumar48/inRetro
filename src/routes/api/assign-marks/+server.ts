import { db } from '$lib/server/db/index.js';
import { userLevelsScore } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const POST = async ({ request }) => {
	try {
		const { userId, marks, levelNumber } = await request.json();
		if (marks < 0 || marks > 100) {
			return json('Invalid marks!\nPlease enter marks between 0 and 100.', { status: 400 });
		}
		const [existingScores] = await db
			.select({ scores: userLevelsScore.scores })
			.from(userLevelsScore)
			.where(eq(userLevelsScore.userId, userId));
		if (existingScores && existingScores.scores?.length) {
			existingScores.scores.push({
				levelNumber,
				score: marks,
				completedOn: new Date()
			});
			await db
				.update(userLevelsScore)
				.set({
					scores: existingScores.scores
				})
				.where(eq(userLevelsScore.userId, userId));
		} else {
			await db.insert(userLevelsScore).values({
				userId,
				scores: [
					{
						levelNumber,
						score: marks,
						completedOn: new Date()
					}
				]
			});
		}
		return json('Marks assigned successfully');
	} catch (err) {
		console.error(err);
		return json('Internal Server Error', { status: 500 });
	}
};
