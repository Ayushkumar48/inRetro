import {
	setSessionTokenCookie,
	generateSessionToken,
	createSession,
	getUserFromGitHubId,
	createUser
} from '$lib/server/auth';
import { github } from '$lib/server/db/github.config';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';

type GitHubEmail = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility?: string;
};

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (code === null || state === null || storedState === null) {
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
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		console.error(e);
		return new Response(null, {
			status: 400
		});
	}
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;

	const existingUser = await getUserFromGitHubId(githubUserId);

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}
	const emailResponse = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const emails: GitHubEmail[] = await emailResponse.json();
	console.log(emails);
	const primaryEmail: string | null =
		emails.find((email: GitHubEmail) => email.primary && email.verified)?.email ?? null;
	const fallbackEmail: string | null =
		primaryEmail ?? emails.find((email: GitHubEmail) => email.verified)?.email ?? null;
	const finalEmail: string =
		fallbackEmail ?? `${githubUser.id}+${githubUser.login}@users.noreply.github.com`;
	const userDetails = {
		githubId: githubUser.id,
		username: githubUser.login,
		name: githubUser.name,
		email: finalEmail,
		avatarUrl: githubUser.avatar_url,
		bio: githubUser.bio
	};

	const user = await createUser(userDetails);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
