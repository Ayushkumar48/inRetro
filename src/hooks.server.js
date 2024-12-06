import connectDB from '$lib/db.js';

export async function handle({ event, resolve }) {
	try {
		// Ensure database connection is established
		await connectDB();

		// Proceed with handling the request
		const response = await resolve(event);
		return response;
	} catch (error) {
		console.error('Error connecting to the database:', error);

		// Optionally, return an error response
		return new Response('Internal Server Error', { status: 500 });
	}
}
