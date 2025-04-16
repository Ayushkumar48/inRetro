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

const currentOS = navigator.userAgent.includes('Mac') ? 'mac' : 'windows/linux';
const shortcutKey = {
	ctrl: currentOS === 'mac' ? '⌘' : 'Ctrl',
	alt: currentOS === 'mac' ? '⌥' : 'Alt',
	shift: currentOS === 'mac' ? '⇧' : 'Shift',
	tab: currentOS === 'mac' ? '⇥' : 'Tab',
	enter: currentOS === 'mac' ? '↵' : 'Enter',
	escape: currentOS === 'mac' ? '⎋' : 'Esc',
	backspace: currentOS === 'mac' ? '⌫' : 'Backspace',
	delete: currentOS === 'mac' ? '⌦' : 'Delete',
	arrowUp: currentOS === 'mac' ? '↑' : 'ArrowUp',
	arrowDown: currentOS === 'mac' ? '↓' : 'ArrowDown',
	arrowLeft: currentOS === 'mac' ? '←' : 'ArrowLeft',
	arrowRight: currentOS === 'mac' ? '→' : 'ArrowRight',
	space: currentOS === 'mac' ? '␣' : 'Space'
};

export const shortcuts = [
	{
		shortcut: `${shortcutKey.ctrl}+S`,
		description: 'Save Project'
	},
	{
		shortcut: `${shortcutKey.ctrl}+P`,
		description: 'Go To File …'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+F`,
		description: 'Format Document'
	},
	{
		shortcut: `${shortcutKey.ctrl}+B`,
		description: 'Toggle Sidebar'
	},
	{
		shortcut: `${shortcutKey.ctrl}+'`,
		description: 'Toggle Terminal'
	},
	{
		shortcut: `${shortcutKey.ctrl}+J`,
		description: 'Toggle Preview'
	},
	{
		shortcut: `${shortcutKey.ctrl}+${shortcutKey.shift}+E`,
		description: 'Show File Explorer'
	},
	{
		shortcut: `${shortcutKey.ctrl}+${shortcutKey.shift}+F`,
		description: 'Show Find In Files'
	},
	{
		shortcut: `${shortcutKey.ctrl}+,`,
		description: 'Show Settings'
	},
	{
		shortcut: 'F2',
		description: 'Show All Commands'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+0`,
		description: 'Fold All'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+J`,
		description: 'Unfold All'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+/`,
		description: 'Fold All Block Comments'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+1`,
		description: 'Fold Level 1'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+2`,
		description: 'Fold Level 2'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+3`,
		description: 'Fold Level 3'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+4`,
		description: 'Fold Level 4'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+5`,
		description: 'Fold Level 5'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+6`,
		description: 'Fold Level 6'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+7`,
		description: 'Fold Level 7'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+[`,
		description: 'Fold Recursively'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+]`,
		description: 'Unfold Recursively'
	},
	{
		shortcut: `${shortcutKey.ctrl}+1`,
		description: 'Focus Editor Tab 1'
	},
	{
		shortcut: `${shortcutKey.ctrl}+2`,
		description: 'Focus Editor Tab 2'
	},
	{
		shortcut: `${shortcutKey.ctrl}+3`,
		description: 'Focus Editor Tab 3'
	},
	{
		shortcut: `${shortcutKey.ctrl}+4`,
		description: 'Focus Editor Tab 4'
	},
	{
		shortcut: `${shortcutKey.ctrl}+5`,
		description: 'Focus Editor Tab 5'
	},
	{
		shortcut: `${shortcutKey.ctrl}+6`,
		description: 'Focus Editor Tab 6'
	},
	{
		shortcut: `${shortcutKey.ctrl}+7`,
		description: 'Focus Editor Tab 7'
	},
	{
		shortcut: `${shortcutKey.ctrl}+X`,
		description: 'Cut line (empty selection)'
	},
	{
		shortcut: `${shortcutKey.ctrl}+C`,
		description: 'Copy line (empty selection)'
	},
	{
		shortcut: `${shortcutKey.alt}+${shortcutKey.arrowDown}`,
		description: 'Move line down'
	},
	{
		shortcut: `${shortcutKey.alt}+${shortcutKey.arrowUp}`,
		description: 'Move line up'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+${shortcutKey.arrowDown}`,
		description: 'Copy line down'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+${shortcutKey.arrowUp}`,
		description: 'Copy line up'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.ctrl}+K`,
		description: 'Delete line'
	},
	{
		shortcut: `${shortcutKey.ctrl}+Enter`,
		description: 'Insert line below'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.ctrl}+Enter`,
		description: 'Insert line above'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.ctrl}+\\`,
		description: 'Jump to matching bracket'
	},
	{
		shortcut: `${shortcutKey.ctrl}+${shortcutKey.arrowUp}`,
		description: 'Go to beginning of file'
	},
	{
		shortcut: `${shortcutKey.ctrl}+${shortcutKey.arrowDown}`,
		description: 'Go to end of file'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+C`,
		description: 'Add line comment'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+U`,
		description: 'Remove line comment'
	},
	{
		shortcut: `${shortcutKey.ctrl}+/`,
		description: 'Toggle line comment'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+A`,
		description: 'Toggle block comment'
	},
	{
		shortcut: `${shortcutKey.alt}+${shortcutKey.ctrl}+${shortcutKey.arrowUp}`,
		description: 'Insert cursor above'
	},
	{
		shortcut: `${shortcutKey.alt}+${shortcutKey.ctrl}+${shortcutKey.arrowDown}`,
		description: 'Insert cursor below'
	},
	{
		shortcut: `${shortcutKey.ctrl}+U`,
		description: 'Undo last cursor operation'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+I`,
		description: 'Insert cursor at end of each line selected'
	},
	{
		shortcut: `${shortcutKey.ctrl}+L`,
		description: 'Select current line'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.ctrl}+L`,
		description: 'Select all occurrences of current selection'
	},
	{
		shortcut: `${shortcutKey.ctrl}+F2`,
		description: 'Select all occurrences of current word'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.ctrl}+→`,
		description: 'Expand selection'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.ctrl}+←`,
		description: 'Shrink selection'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+drag-mouse`,
		description: 'Column (box) selection'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+${shortcutKey.ctrl}+↑`,
		description: 'Column (box) selection up'
	},
	{
		shortcut: `${shortcutKey.shift} +${shortcutKey.alt}+${shortcutKey.ctrl}+↓`,
		description: 'Column (box) selection down'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+${shortcutKey.ctrl}+←`,
		description: 'Column (box) selection left'
	},
	{
		shortcut: `${shortcutKey.shift}+${shortcutKey.alt}+${shortcutKey.ctrl}+→`,
		description: 'Column (box) selection right'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+F12`,
		description: 'Open Definition to the side'
	},
	{
		shortcut: `${shortcutKey.shift}+F12`,
		description: 'Show References'
	},
	{
		shortcut: 'F2',
		description: 'Rename Symbol'
	},
	{
		shortcut: `${shortcutKey.ctrl}+K+${shortcutKey.ctrl}+X`,
		description: 'Trim trailing whitespace'
	}
];

export function initials(name: string) {
	if (!name || !name.length) return '';
	const nameArray = name.split(' ');
	if (nameArray.length > 1) {
		return nameArray[0].charAt(0).toUpperCase() + nameArray[1].charAt(0).toUpperCase();
	} else {
		return name.charAt(0).toUpperCase();
	}
}

export function formatShortTime(date: Date) {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	};
	return new Intl.DateTimeFormat('en-US', options).format(date);
}
