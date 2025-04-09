import type { LevelDetails } from '$lib/server/db/schema';

export type LevelDataType = {
	id: string;
	levelId: number;
	levelDetails: LevelDetails;
	status: 'Not Attempted' | 'Attempted' | 'Submitted for Evaluation' | 'Completed';
};

type LevelWithQuery = LevelDataType & { searchQuery: string };
export const searchLevels = $state<{ current: LevelWithQuery[] }>({ current: [] });

export const originalLevels = $state<{ current: LevelWithQuery[] }>({ current: [] });
