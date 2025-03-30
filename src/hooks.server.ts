import * as auth from '$lib/server/auth.js';
import type { Handle } from '@sveltejs/kit';

const handleAuth: Handle = async ({ event, resolve }) => {
	event.locals.admin = null;
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	const data = await auth.validateSessionToken(sessionToken);
	if (data.session) {
		auth.setSessionTokenCookie(event, sessionToken, data.session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}
	event.locals.user = data.user;
	event.locals.session = data.session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
