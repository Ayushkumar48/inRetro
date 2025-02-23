import { PersistedState } from 'runed';
export type UserType = {
	id: string;
	age: number | null;
	name: string | null;
	email: string;
	username: string;
	image: string | null;
	createdAt: Date;
} | null;

export const user = new PersistedState<UserType>('user', null);
