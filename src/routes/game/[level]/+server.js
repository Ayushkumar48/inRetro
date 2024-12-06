import connectDB from '../../../lib/db.js';
import Level from '$lib/models/Level.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	await connectDB();
	const { level, html, css, js, tasks } = await request.json();
	const myLevel = new Level({ level, html, css, js, tasks });
	try {
		const res = await myLevel.save();
		return json({ res }, { status: 201 });
	} catch (err) {
		console.log(err);
	}
}
