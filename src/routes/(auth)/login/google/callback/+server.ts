import { decodeIdToken } from 'arctic';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { google } from '$lib/server/db';
import {
	createSession,
	createUser,
	generateSessionToken,
	getUserFromAuthProviderId,
	setSessionTokenCookie
} from '$lib/server/auth';

type GoogleClaims = {
	sub: string;
	email?: string;
	email_verified?: boolean;
	name?: string;
	given_name?: string;
	family_name?: string;
	picture?: string;
	locale?: string;
};

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		console.error(e);
		return new Response(null, {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken()) as GoogleClaims;
	const googleUserId = claims.sub;

	const existingUser = await getUserFromAuthProviderId(googleUserId, 'google');

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/game'
			}
		});
	}
	const userDetails = {
		googleId: googleUserId,
		email: claims.email || '',
		username: claims.email?.split('@')[0] || '',
		name: claims.name || '',
		avatarUrl: claims.picture || '',
		bio: ''
	};

	const user = await createUser(userDetails, 'google');

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/game'
		}
	});
}
