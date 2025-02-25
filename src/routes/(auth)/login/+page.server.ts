import { hash, verify } from '@node-rs/argon2';
import { type Actions } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { PageServerLoad } from './$types';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userSchema } from '$lib/client/schema';
import { db } from '$lib/server/db';
import { eq, or } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { users } from '$lib/server/db/schema';
import containerClient from '$lib/server/db/azure.config';

export const load: PageServerLoad = async () => {
	return {
		signup: await superValidate(zod(userSchema))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		try {
			const results = await db.select().from(users).where(eq(users.username, username));

			const existingUser = results.at(0);

			if (!existingUser) {
				return fail(400, { status: 400, message: 'Incorrect username or password' });
			}

			if (!existingUser.password) {
				return fail(400, {
					status: 400,
					message: 'This account is authorized with Github. Please login using github.'
				});
			}

			const validPassword = await verify(existingUser.password, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			if (!validPassword) {
				return fail(400, { status: 400, message: 'Incorrect credentials' });
			}

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, existingUser.id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

			return { status: 200, message: 'User logged in!' };
		} catch (error) {
			console.error(error);
			return fail(500, { status: 500, message: 'An error has occurred!' });
		}
	},

	signup: async (event) => {
		const form = await superValidate(event, zod(userSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const [existingUser] = await db
				.select()
				.from(users)
				.where(
					or(
						eq(users.username, form.data.username as string),
						eq(users.email, form.data.email as string)
					)
				);
			if (existingUser?.githubId) {
				return message(
					form,
					{
						status: 'error',
						text: 'This email and/or username are linked to a GitHub account. Please log in using GitHub.'
					},
					{ status: 403 }
				);
			}
			if (existingUser?.email === form.data.email) {
				return message(form, { status: 'error', text: 'Email already exists.' }, { status: 403 });
			}

			if (existingUser?.username === form.data.username) {
				return message(
					form,
					{ status: 'error', text: 'Username already exists.' },
					{ status: 403 }
				);
			}
			const userId = auth.generateUserId();
			const passwordHash = await hash(form.data.password as string, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			const file = form.data.image;
			let imageUrl: string | null = null;
			if (file) {
				try {
					const uniqueFileName = `${uuidv4()}-${file.name}`;
					const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);

					const arrayBuffer = await file.arrayBuffer();
					const content = new Uint8Array(arrayBuffer);

					await blockBlobClient.upload(content, content.length, {
						blobHTTPHeaders: { blobContentType: file.type }
					});

					imageUrl = blockBlobClient.url;
				} catch (error) {
					console.error('File upload error:', error);
					return message(
						form,
						{ status: 'error', text: 'Failed to upload profile picture' },
						{ status: 500 }
					);
				}
			}
			await db.insert(users).values({
				id: userId,
				name: form.data.name,
				username: form.data.username,
				email: form.data.email,
				password: passwordHash,
				image: imageUrl
			});

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

			return message(form, { status: 'success', text: 'Account created successfully!' });
		} catch (error) {
			console.error(error);
			return message(form, { status: 'error', text: 'An error has occurred' }, { status: 500 });
		}
	}
};
