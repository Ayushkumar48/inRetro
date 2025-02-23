import { redirect, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

const handleAuth: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		if (pathname.includes('game')) {
			throw redirect(308, '/login');
		}
		return resolve(event);
	}

	const data = await auth.validateSessionToken(sessionToken);

	if (data.session) {
		auth.setSessionTokenCookie(event, sessionToken, data.session.expiresAt);
		if (pathname.includes('login')) {
			throw redirect(308, '/game');
		}
	} else {
		auth.deleteSessionTokenCookie(event);
	}
	event.locals.user = data.user;
	event.locals.session = data.session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
