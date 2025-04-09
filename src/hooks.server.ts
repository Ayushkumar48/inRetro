import * as auth from '$lib/server/auth.js';
import * as adminAuth from '$lib/server/adminAuth.js';
import type { Handle } from '@sveltejs/kit';

const handleAuth: Handle = async ({ event, resolve }) => {
	// === USER SESSION CHECK ===
	const userSessionToken = event.cookies.get(auth.sessionCookieName);
	if (userSessionToken) {
		const data = await auth.validateSessionToken(userSessionToken);
		if (data.session) {
			auth.setSessionTokenCookie(event, userSessionToken, data.session.expiresAt);
			event.locals.user = data.user;
			event.locals.session = data.session;
		} else {
			auth.deleteSessionTokenCookie(event);
		}
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}

	// === ADMIN SESSION CHECK ===
	const adminSessionToken = event.cookies.get(adminAuth.adminSessionCookieName);
	if (adminSessionToken) {
		const adminData = await adminAuth.validateSessionToken(adminSessionToken);
		if (adminData.adminSession) {
			adminAuth.setSessionTokenCookie(event, adminSessionToken, adminData.adminSession.expiresAt);
			event.locals.admin = adminData.admin;
			event.locals.adminSession = adminData.adminSession;
		} else {
			adminAuth.deleteSessionTokenCookie(event);
		}
	} else {
		event.locals.admin = null;
		event.locals.adminSession = null;
	}
	return resolve(event);
};

export const handle: Handle = handleAuth;
