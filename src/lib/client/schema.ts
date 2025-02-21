import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	name: z.string().min(1, { message: "Name can't be empty." }),
	username: z.string().min(6, { message: 'Username must contain at least 6 character(s).' }),
	email: z.string().email(),
	password: z.string().min(8, {
		message: 'Password must contain atleast 8 characters with atleast 1 number and 1 alphabet.'
	})
});

export type UserSchema = typeof userSchema;
