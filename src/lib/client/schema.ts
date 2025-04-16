import { z } from 'zod';

export const userSchema = z.object({
	name: z.string().min(1, { message: "Name can't be empty." }),
	username: z.string().min(6, { message: 'Username must contain at least 6 character(s).' }),
	email: z.string().email(),
	password: z.string().min(8, {
		message: 'Password must contain atleast 8 characters with atleast 1 number and 1 alphabet.'
	}),
	image: z
		.instanceof(File)
		.refine((file) => file.size <= 5 * 1024 * 1024, {
			message: 'File size must be less than 5MB'
		})
		.optional()
});

export const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, 'Username must be at least 2 characters.')
		.max(30, 'Username must not be longer than 30 characters'),
	email: z.string().email(),
	bio: z.string().max(160, "Bio can't be more than 160 characters.").optional(),
	urls: z.array(z.string().url()).default([])
});

export const accountFormSchema = z.object({
	name: z.string(),
	dob: z.date().optional(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
			'Password must contain at least one letter, one number, and one special character'
		)
		.optional()
});

export type UserSchema = typeof userSchema;
export type ProfileSchema = typeof profileFormSchema;
export type AccountSchema = typeof accountFormSchema;
