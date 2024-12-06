import { fail, redirect } from '@sveltejs/kit';
import User from '$lib/models/User.js';
import bcrypt from 'bcryptjs';

let salt = 10;

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		try {
			const userData = (await User.query('username').eq(username).exec()).toJSON()[0];
			if (!userData) {
				return fail(407, { message: "User doesn't exists!!!", success: false });
			} else {
				const check = bcrypt.compareSync(password, userData.password);
				if (check) {
					cookies.set('username', username, { path: '/' });
					return { message: 'LoggedIn successfully!!!', success: true };
				} else {
					return fail(403, {
						message: 'Username or/and password is/and incorrect!!!',
						success: false
					});
				}
			}
		} catch (err) {
			console.error(err);
		}
		return { username };
	},
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');
		const hash = bcrypt.hashSync(password, salt);
		try {
			const existingUser = (await User.query('username').eq(username).exec()).toJSON()[0];
			if (!existingUser) {
				const newUser = new User({
					name,
					username,
					email,
					password: hash
				});
				await newUser.save();
				cookies.set('username', username, { path: '/' });
				return { message: 'Account created successfully!!!', success: true };
			} else {
				if (existingUser.email === email) {
					return fail(407, { message: 'Email already exists!!!', success: false });
				}
				return fail(407, { message: 'User already exists!!!', success: false });
			}
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Internal Error occured!!!', success: false });
		}
	}
};

export async function load({ cookies }) {
	const username = cookies.get('username');
	if (username && username !== '') {
		redirect(307, '/game');
	}
}
