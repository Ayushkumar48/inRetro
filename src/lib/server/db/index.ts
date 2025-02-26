import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { BlobServiceClient } from '@azure/storage-blob';
import {
	AZURE_STORAGE_CONNECTION_STRING,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	REDIS_URL
} from '$env/static/private';
import { Google, GitHub } from 'arctic';
import Redis from 'ioredis';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);

const blobServiceClient = BlobServiceClient.fromConnectionString(
	AZURE_STORAGE_CONNECTION_STRING as string
);

export const containerClient = blobServiceClient.getContainerClient('user-images');

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	'https://inretro.vercel.app/login/google/callback'
);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, null);

export const redis = new Redis(REDIS_URL);
