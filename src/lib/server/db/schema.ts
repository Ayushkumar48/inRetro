import {
	pgTable,
	text,
	timestamp,
	serial,
	json,
	jsonb,
	date,
	integer,
	uuid
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	githubId: integer('github_id'),
	googleId: text('google_id'),
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
	type: string;
	details: string;
	language: string;
	status: 'Not Attempted' | 'Attempted' | 'Submitted for Evaluation' | 'Completed';
	isBookmarked: boolean;
};

export const userLevels = pgTable('user_levels', {
	id: uuid().defaultRandom().primaryKey(),
	levelId: integer('level_id')
		.references(() => allLevels.id, { onDelete: 'cascade' })
		.notNull(),
	levelDetails: jsonb('level_details').$type<LevelDetails>().notNull(),
	files: json('files').notNull(),
	template: text('template'),
	startScript: text('start_script'),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

export const adminSessions = pgTable('admin_sessions', {
	id: text('id').primaryKey(),
	adminId: text('admin_id')
		.notNull()
		.references(() => admin.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const admin = pgTable('admin', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Level = typeof allLevels.$inferSelect;
export type NewLevel = typeof allLevels.$inferInsert;

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type UserLevel = typeof userLevels.$inferSelect;
export type NewUserLevel = typeof userLevels.$inferInsert;

export type Admin = typeof admin.$inferSelect;
export type NewAdmin = typeof admin.$inferInsert;

export type AdminSession = typeof adminSessions.$inferSelect;
export type NewAdminSession = typeof adminSessions.$inferInsert;
