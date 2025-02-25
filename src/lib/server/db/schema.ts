import { pgTable, text, timestamp, serial, json, jsonb, date, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	githubId: integer('github_id'),
	name: text('name'),
	email: text('email'),
	username: text('username'),
	password: text('password'),
	image: text('image'),
	dob: date('dob'),
	bio: text('bio'),
	urls: text('urls').array(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const allLevels = pgTable('all_levels', {
	id: serial('id').primaryKey(),
	levelDetails: jsonb('level_details').$type<LevelDetails>().notNull(),
	files: json('files').notNull(),
	template: text('template'),
	startScript: text('start_script')
});

export type LevelDetails = {
	path: string;
	language: string;
	details: string;
	isCompleted: boolean;
};
export type Level = typeof allLevels.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof users.$inferSelect;
