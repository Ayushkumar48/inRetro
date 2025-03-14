import { type ClassValue, clsx } from 'clsx';
import {
	siCss,
	siHtml5,
	siJavascript,
	siNextdotjs,
	siNodedotjs,
	siReact,
	siSvelte,
	siTypescript
} from 'simple-icons';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const cardColors = {
	html: 'hsl(13, 73%, 51%)',
	css: 'hsl(270, 50%, 39%)',
	javascript: 'hsl(50, 97%, 35%)',
	nodejs: 'hsl(107, 58%, 48%)',
	svelte: 'hsl(15, 100%, 50%)',
	reactjs: 'hsl(191, 65%, 60%)',
	sveltekit: 'hsl(15, 100%, 50%)',
	nextjs: 'hsl(215, 28%, 17%)',
	typescript: 'hsl(211, 60%, 49%)'
};

export const cardIcons = {
	html: siHtml5,
	css: siCss,
	javascript: siJavascript,
	nodejs: siNodedotjs,
	svelte: siSvelte,
	reactjs: siReact,
	sveltekit: siSvelte,
	nextjs: siNextdotjs,
	typescript: siTypescript
};
