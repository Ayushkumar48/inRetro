import type { LevelDetails } from '$lib/server/db/schema';
import { PersistedState } from 'runed';

export type LevelType = {
	id: number;
	levelDetails: LevelDetails;
};
export type LevelDataType = {
	id: number;
	levelDetails: LevelDetails;
	searchQuery: string;
};

export const localLevels = new PersistedState<LevelType[] | null>('all_levels', null);

export const searchLevels = $state<{ current: LevelDataType[] }>({ current: [] });

export const originalLevels = $state<{ current: LevelDataType[] }>({ current: [] });
