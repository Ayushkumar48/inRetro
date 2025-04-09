import { sql } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	serial,
	json,
	date,
	integer,
	uuid,
	boolean,
	pgEnum
} from 'drizzle-orm/pg-core';
import { customType } from 'drizzle-orm/pg-core';

const CustomJSONB = <TData>(name: string) =>
	customType<{ data: TData; driverData: string }>({
		dataType() {
			return 'jsonb';
		},
		toDriver(value: TData): string {
			return JSON.stringify(value);
		}
	})(name);

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
	levelDetails: CustomJSONB<LevelDetails>('level_details').notNull(),
	files: json('files').notNull(),
	template: text('template'),
	startScript: text('start_script')
});

export type LevelDetails = {
	path: string;
	type: string;
	details: string;
	language: string;
	isBookmarked: boolean;
};

export const levelStatusEnum = pgEnum('level_status', [
	'Not Attempted',
	'Attempted',
	'Submitted for Evaluation',
	'Completed'
]);

export const userLevels = pgTable('user_levels', {
	id: uuid()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	levelId: integer('level_id')
		.references(() => allLevels.id, { onDelete: 'cascade' })
		.notNull(),
	levelDetails: CustomJSONB<LevelDetails>('level_details').notNull(),
	files: json('files').notNull(),
	template: text('template'),
	startScript: text('start_script'),
	status: levelStatusEnum('status').default('Not Attempted').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

export type Score = {
	levelNumber: number;
	score: number;
	completedOn: Date;
};

export const userLevelsScore = pgTable('user_levels_score', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	scores: CustomJSONB<Score>('scores').array()
});

export const adminSession = pgTable('admin_session', {
	id: text('id').primaryKey(),
	adminId: text('admin_id')
		.notNull()
		.references(() => admin.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const admin = pgTable('admin', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	isApproved: boolean('is_approved').default(false),
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

export type UserLevelsScore = typeof userLevelsScore.$inferSelect;
export type NewUserLevelsScore = typeof userLevelsScore.$inferInsert;

export type Admin = typeof admin.$inferSelect;
export type NewAdmin = typeof admin.$inferInsert;
export type SafeAdmin = Omit<Admin, 'password'>;

export type AdminSession = typeof adminSession.$inferSelect;
export type NewAdminSession = typeof adminSession.$inferInsert;
