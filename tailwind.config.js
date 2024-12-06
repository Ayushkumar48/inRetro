import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	safelist: [
		'bg-yellow-700',
		'bg-sky-700',
		'bg-green-700',
		'bg-red-700',
		'bg-slate-700',
		'bg-blue-700',
		'bg-orange-700',
		'bg-teal-700',
		'bg-emerald-700',
		'bg-violet-700',
		'bg-indigo-700',
		'bg-fuchsia-700',
		'bg-pink-700',
		'bg-lime-700',
		'bg-rose-700',
		'bg-purple-700',
		'bg-cya-700n'
	],
	plugins: [typography, forms, containerQueries]
};
