import { redirect, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

const PROTECTED_PATHS = ['/game', '/profile'];
const AUTH_PATHS = ['/login'];

const handleAuth: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
	const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		if (isProtectedPath) {
			throw redirect(308, '/login');
		}
		return resolve(event);
	}

	const data = await auth.validateSessionToken(sessionToken);

	if (data.session) {
		auth.setSessionTokenCookie(event, sessionToken, data.session.expiresAt);
		if (isAuthPath) {
			throw redirect(308, '/game');
		}
	} else {
		auth.deleteSessionTokenCookie(event);
		if (isProtectedPath) {
			throw redirect(308, '/login');
		}
	}
	event.locals.user = data.user;
	event.locals.session = data.session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
