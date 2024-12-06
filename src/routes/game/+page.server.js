export async function load({ cookies }) {
	const username = cookies.get('username');
	return { username };
}
