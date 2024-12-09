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
		'bg-cyan-700',
		'bg-yellow-600',
		'bg-sky-600',
		'bg-green-600',
		'bg-red-600',
		'bg-slate-600',
		'bg-blue-600',
		'bg-orange-600',
		'bg-teal-600',
		'bg-emerald-600',
		'bg-violet-600',
		'bg-indigo-600',
		'bg-fuchsia-600',
		'bg-pink-600',
		'bg-lime-600',
		'bg-rose-600',
		'bg-purple-600',
		'bg-cyan-600'
	],
	plugins: [typography, forms, containerQueries]
};
