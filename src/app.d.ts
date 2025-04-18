// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
			admin: import('$lib/server/db/schema').SafeAdmin | null;
			adminSession: import('$lib/server/db/schema').AdminSession | null;
		}
	}
}

export {};
