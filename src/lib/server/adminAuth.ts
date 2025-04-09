import { sha256 } from '@oslojs/crypto/sha2';
import type { RequestEvent } from '@sveltejs/kit';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import * as table from '$lib/server/db/schema';
import { db } from './db';
import { eq } from 'drizzle-orm';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const adminSessionCookieName = 'admin-auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createAdminSession(token: string, adminId: string) {
	const adminSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const adminSession: table.AdminSession = {
		id: adminSessionId,
		adminId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 2)
	};
	await db.insert(table.adminSession).values(adminSession);
	return adminSession;
}

export async function validateSessionToken(token: string) {
	const adminSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			admin: {
				id: table.admin.id,
				name: table.admin.name,
				email: table.admin.email,
				isApproved: table.admin.isApproved,
				createdAt: table.admin.createdAt
			},
			adminSession: table.adminSession
		})
		.from(table.adminSession)
		.innerJoin(table.admin, eq(table.adminSession.adminId, table.admin.id))
		.where(eq(table.adminSession.id, adminSessionId));

	if (!result) {
		return { adminSession: null, admin: null };
	}
	const { adminSession, admin } = result;

	const adminSessionExpired = Date.now() >= adminSession.expiresAt.getTime();
	if (adminSessionExpired) {
		await db.delete(table.adminSession).where(eq(table.adminSession.id, admin.id));
		return { adminSession: null, admin: null };
	}

	const renewAdminSession = Date.now() >= adminSession.expiresAt.getTime() - DAY_IN_MS;
	if (renewAdminSession) {
		adminSession.expiresAt = new Date(Date.now() + DAY_IN_MS * 2);
		await db
			.update(table.adminSession)
			.set({ expiresAt: adminSession.expiresAt })
			.where(eq(table.adminSession.id, adminSession.id));
	}

	return { admin, adminSession };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(token: string) {
	const adminSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	await db.delete(table.adminSession).where(eq(table.adminSession.id, adminSessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(adminSessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(adminSessionCookieName, {
		path: '/'
	});
}
