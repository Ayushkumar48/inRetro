import type { LevelDetails, User } from '$lib/server/db/schema';
import { PersistedState } from 'runed';

export type LevelType = {
	id: number;
	levelDetails: LevelDetails;
};

export const user = new PersistedState<User | null | undefined>('user', null);

export const localLevels = new PersistedState<LevelType[] | null>('all_levels', null);
